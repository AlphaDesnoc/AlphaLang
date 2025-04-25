import { ReturnValue, RuntimeError } from "./errors.ts";
import { Memory } from "./memory.ts";
import {
  ArrayAccessExpression,
  ArrayExpression,
  AssignmentExpression,
  BinaryExpression,
  BlockStatement,
  CallExpression,
  Expression,
  ExpressionType,
  ForStatement,
  FunctionStatement,
  LiteralExpression,
  LogicalExpression,
  ReturnStatement,
  Statement,
  StatementType,
  StdOut,
  TokenType,
  UnaryExpression,
  Value,
  VariableExpression,
  WhileStatement,
  ForeachStatement,
  ClassStatement,
  FieldAccessExpression,
  FieldAssignmentExpression,
  InstanceOfExpression,
} from "./type.ts";
import { buildASTTree } from "./ast.ts";
import { parseTokens } from "./lexer.ts";
import { globals } from "./stdlib.ts";
import { Callable, Instance } from "./callable.ts";

let blockMemory = new Memory(globals);
let stdOut: StdOut;
let classes: Record<string, { methods: Record<string, FunctionStatement>, parent?: string }> = {};
let staticMethods: Record<string, Record<string, FunctionStatement>> = {};

export function interpret(source: string, out: StdOut): void {
  const ast = buildASTTree(parseTokens(source));
  stdOut = out;
  if (!import.meta.env.TEST) {
    console.log("AST:", ast);
  }
  blockMemory.clear();
  ast.body.map(evalStatement);
}

function evalStatement(statement: Statement | null): void {
  if (statement === null) {
    return;
  }
  switch (statement.type) {
    case StatementType.Expression:
      evalExpression(statement.expression);
      return;
    case StatementType.Declaration:
      blockMemory.define(statement.name, evalExpression(statement.expression));
      return;
    case StatementType.Block:
      evalBlock(statement);
      return;
    case StatementType.Print:
      const val = evalExpression(statement.expression);
      if (isInstance(val)) {
        const classDef = classes[val.className];
        if (classDef && classDef.methods["toString"]) {
          // Appel de la méthode toString sans argument
          const previousMemory = blockMemory;
          blockMemory = new Memory(blockMemory);
          blockMemory.define("this", val);
          let str = "[instance de " + val.className + "]";
          try {
            classDef.methods["toString"].body.forEach(evalStatement);
          } catch (e) {
            if (e instanceof ReturnValue) {
              str = e.value as string;
            } else {
              throw e;
            }
          }
          blockMemory = previousMemory;
          stdOut.push(str);
          return;
        }
        stdOut.push("[instance de " + val.className + "]");
        return;
      }
      stdOut.push(`${val}`);
      return;
    case StatementType.If:
      const conditionValue = evalExpression(statement.condition);
      ensureBoolean(
        conditionValue,
        `Un booléen doit être utilisé pour une condition`,
        statement.condition,
      );
      evalStatement(conditionValue ? statement.right : statement.wrong);
      return;
    case StatementType.While:
      evalWhile(statement);
      return;
    case StatementType.For:
      evalFor(statement);
      return;
    case StatementType.Function:
      evalFuncDeclar(statement);
      return;
    case StatementType.Return:
      evalReturn(statement);
      return;
    case StatementType.Foreach:
      evalForeach(statement);
      return;
    case StatementType.Class:
      evalClassDeclar(statement);
      return;
  }
}

function evalReturn(statement: ReturnStatement): void {
  throw new ReturnValue(evalExpression(statement.expression));
}

function evalFuncDeclar(statement: FunctionStatement): void {
  const name = statement.name.value;
  blockMemory.define(
    name,
    new Callable(statement.parameters.length, (...args) => {
      const previousMemory = blockMemory;
      blockMemory = new Memory(blockMemory);
      statement.parameters.map((param, k) =>
        blockMemory.define(param.value, args[k]),
      );
      try {
        statement.body.map(evalStatement);
      } catch (e) {
        if (e instanceof ReturnValue) {
          blockMemory = previousMemory;
          return e.value;
        }
        throw e;
      }
      blockMemory = previousMemory;
    }),
  );
}

function evalWhile(statement: WhileStatement): void {
  let limiter = 0; // Pour éviter les boucles infinies, on limite à 10 000 itérations
  while (evalExpression(statement.condition)) {
    limiter++;
    if (limiter > 10_000) {
      throw new RuntimeError(
        "Boucle infinie, la condition de cette boucle ne devient jamais fausse",
        statement.condition.position,
      );
    }
    evalBlock(statement.body);
  }
}

function evalFor(statement: ForStatement): void {
  const previousMemory = blockMemory;
  const start = evalExpression(statement.start);
  const end = evalExpression(statement.end);
  ensureNumber(
    start,
    "La valeur de départ de la boucle doit être un nombre",
    statement.start,
  );
  ensureNumber(
    end,
    "La valeur de fin de la boucle doit être un nombre",
    statement.start,
  );
  const increment = start <= end ? 1 : -1;
  for (
    let i = start;
    increment === 1 ? i <= end : i >= end;
    i = i + increment
  ) {
    blockMemory = new Memory(blockMemory);
    blockMemory.define(statement.variable, i);
    statement.body.map(evalStatement);
    blockMemory = previousMemory;
  }
}

function evalBlock(statement: BlockStatement): void {
  const previousMemory = blockMemory;
  blockMemory = new Memory(blockMemory);
  statement.body.map(evalStatement);
  blockMemory = previousMemory;
}

function evalExpression(expr: Expression): Value {
  switch (expr.type) {
    case ExpressionType.Binary:
      return evalBinary(expr);
    case ExpressionType.Unary:
      return evalUnary(expr);
    case ExpressionType.Literal:
      return evalLiteral(expr);
    case ExpressionType.Variable:
      return evalVariable(expr);
    case ExpressionType.Assignment:
      return evalAssignment(expr);
    case ExpressionType.Logical:
      return evalLogical(expr);
    case ExpressionType.Call:
      return evalCall(expr);
    case ExpressionType.Array:
      return evalArray(expr);
    case ExpressionType.ArrayAccess:
      return evalArrayAcccess(expr);
    case ExpressionType.FieldAccess:
      return evalFieldAccess(expr);
    case "FieldAssignment":
      return evalFieldAssignment(expr);
    case "InstanceOf":
      return evalInstanceOf(expr);
  }
  return null;
}

function evalVariable(expr: VariableExpression): Value {
  return blockMemory.getValue(expr.name);
}

function evalAssignment(expr: AssignmentExpression): Value {
  return blockMemory.assign(expr.variable.name, evalExpression(expr.value));
}

function evalLiteral(expr: LiteralExpression): Value {
  return expr.value;
}

function evalUnary(expr: UnaryExpression): Value {
  const right = evalExpression(expr.right);
  switch (expr.operator.type) {
    case TokenType.MINUS:
      if (typeof right !== "number") {
        throw new RuntimeError(
          `Impossible d'utiliser l'opérateur "-" sur une valeur qui n'est pas un nombre`,
          expr.position,
        );
      }
      return right * -1;
    case TokenType.BANG:
      if (typeof right !== "boolean") {
        throw new RuntimeError(
          `Impossible d'utiliser l'opérateur "!" sur une valeur qui n'est pas un booléen (vrai / faux)`,
          expr.position,
        );
      }
      return !right;
  }

  return null;
}

function evalBinary(expr: BinaryExpression): Value {
  const sides = [evalExpression(expr.left), evalExpression(expr.right)];
  switch (expr.operator.type) {
    case TokenType.MINUS:
      ensureNumbers(sides, `Seul des nombres peuvent être soustraits`, expr);
      return sides[0] - sides[1];
    case TokenType.SLASH:
      ensureNumbers(sides, `Seul des nombres peuvent être divisés`, expr);
      return sides[0] / sides[1];
    case TokenType.STAR:
      ensureNumbers(sides, `Seul des nombres peuvent être multipliés`, expr);
      return sides[0] * sides[1];
    case TokenType.GREATER:
      ensureNumbers(sides, `Seul des nombres peuvent être comparés`, expr);
      return sides[0] > sides[1];
    case TokenType.GREATER_EQUAL:
      ensureNumbers(sides, `Seul des nombres peuvent être comparés`, expr);
      return sides[0] >= sides[1];
    case TokenType.LESS_EQUAL:
      ensureNumbers(sides, `Seul des nombres peuvent être comparés`, expr);
      return sides[0] <= sides[1];
    case TokenType.LESS:
      ensureNumbers(sides, `Seul des nombres peuvent être comparés`, expr);
      return sides[0] < sides[1];
    case TokenType.PLUS:
      // Cas 1 : les deux sont des nombres
      if (typeof sides[0] === "number" && typeof sides[1] === "number") {
        return sides[0] + sides[1];
      }
      // Cas 2 : les deux sont des chaînes
      if (typeof sides[0] === "string" && typeof sides[1] === "string") {
        return sides[0] + sides[1];
      }
      // Cas 3 : string + number
      if (typeof sides[0] === "string" && typeof sides[1] === "number") {
        return sides[0] + sides[1].toString();
      }
      // Cas 4 : number + string
      if (typeof sides[0] === "number" && typeof sides[1] === "string") {
        return sides[0].toString() + sides[1];
      }
      throw new RuntimeError(
        `Impossible d'additionner ces types ensembles (types: ${typeof sides[0]} + ${typeof sides[1]})`,
        expr.position,
      );
    case TokenType.EQUAL_EQUAL:
      return sides[0] === sides[1];
    case TokenType.BANG_EQUAL:
      return sides[0] !== sides[1];
  }

  return null;
}

function evalLogical(expr: LogicalExpression): boolean {
  const left = evalExpression(expr.left);
  ensureBoolean(
    left,
    `L'expression à gauche d'un ${expr.operator.value} doit être un booléen`,
    expr.left,
  );
  // Pour les conditions, on peut courtcircuiter si (false et ... / true ou ...)
  if (
    (!left && expr.operator.type === TokenType.AND) ||
    (left && expr.operator.type === TokenType.OR)
  ) {
    return left;
  }
  const right = evalExpression(expr.right);
  ensureBoolean(
    right,
    `L'expression à droite d'un ${expr.operator.value} doit être un booléen`,
    expr.left,
  );
  return right;
}

function evalCall(expr: CallExpression): Value {
  const callee = evalExpression(expr.callee);
  // Création d'une instance de classe : NomClasse()
  if (typeof callee === "string" && classes[callee]) {
    const instance = { className: callee, fields: {} as Record<string, Value> };
    const classDef = classes[callee];
    const initMethod = classDef.methods["init"];
    if (initMethod) {
      const previousMemory = blockMemory;
      blockMemory = new Memory(blockMemory);
      blockMemory.define("this", instance);
      initMethod.parameters.forEach((param, i) => {
        blockMemory.define(param.value, evalExpression(expr.args[i]));
      });
      try {
        initMethod.body.forEach(evalStatement);
      } catch (e) {
        if (!(e instanceof ReturnValue)) throw e;
      }
      blockMemory = previousMemory;
    }
    return instance;
  }
  // Appel de méthode liée à une instance
  if (callee && typeof callee === "object" && "__method__" in callee && "__instance__" in callee) {
    const method = (callee as any)["__method__"] as FunctionStatement;
    const object = (callee as any)["__instance__"];
    const previousMemory = blockMemory;
    blockMemory = new Memory(blockMemory);
    if (object) {
      blockMemory.define("this", object);
    }
    method.parameters.forEach((param, i) => {
      blockMemory.define(param.value, evalExpression(expr.args[i]));
    });
    let result: Value = undefined;
    try {
      method.body.forEach(evalStatement);
    } catch (e) {
      if (e instanceof ReturnValue) {
        result = e.value;
      } else {
        throw e;
      }
    }
    blockMemory = previousMemory;
    return result;
  }
  // Appel de méthode sur une instance : obj.methode(...)
  if (expr.callee.type === "FieldAccess") {
    const fieldAccess = expr.callee;
    const object = evalExpression(fieldAccess.object);
    if (isInstance(object)) {
      const classDef = classes[object.className];
      if (!classDef) throw new RuntimeError(`Classe '${object.className}' non trouvée`, expr.position);
      const method = classDef.methods[fieldAccess.field];
      if (!method) throw new RuntimeError(`Méthode '${fieldAccess.field}' non trouvée dans la classe '${object.className}'`, expr.position);
      // On exécute la méthode dans un nouveau contexte mémoire avec 'this' défini
      const previousMemory = blockMemory;
      blockMemory = new Memory(blockMemory);
      blockMemory.define("this", object);
      method.parameters.forEach((param, i) => {
        blockMemory.define(param.value, evalExpression(expr.args[i]));
      });
      let result: Value = undefined;
      try {
        method.body.forEach(evalStatement);
      } catch (e) {
        if (e instanceof ReturnValue) {
          result = e.value;
        } else {
          throw e;
        }
      }
      blockMemory = previousMemory;
      return result;
    }
  }
  if (!(callee instanceof Callable)) {
    throw new RuntimeError(`La valeur n'est pas une fonction`, expr.position);
  }
  if (callee.arity !== expr.args.length) {
    throw new RuntimeError(
      `La fonction attend ${callee.arity} paramètre (${expr.args.length} obtenus)`,
      expr.argsPosition,
    );
  }
  return callee.call(...expr.args.map(evalExpression));
}

function evalArray(expr: ArrayExpression): Value {
  return expr.elements.map(evalExpression);
}

function evalArrayAcccess(expr: ArrayAccessExpression): Value {
  const source = evalExpression(expr.source);
  if (!Array.isArray(source)) {
    throw new RuntimeError(
      `Impossible d'utiliser cet élément comme un tableau`,
      expr.source.position,
    );
  }
  const index = evalExpression(expr.index);
  if (typeof index !== "number") {
    throw new RuntimeError(
      `L'index d'un tableau doit être un nombre`,
      expr.index.position,
    );
  }
  if (index >= source.length) {
    throw new RuntimeError(
      `L'index est supérieur à la taille du tableau (index: ${index}, taille: ${source.length})`,
      expr.index.position,
    );
  }
  if (index < 0) {
    throw new RuntimeError(
      `L'index d'un tableau ne peut pas être négatif (valeur obtenue: ${index})`,
      expr.index.position,
    );
  }
  return source[index];
}

function evalForeach(statement: ForeachStatement): void {
  const source = evalExpression(statement.source);
  if (!Array.isArray(source)) {
    throw new RuntimeError(
      `La source d'une boucle FOREACH doit être un tableau`,
      statement.source.position,
    );
  }
  for (const value of source) {
    const previousMemory = blockMemory;
    blockMemory = new Memory(blockMemory);
    blockMemory.define(statement.variable, value);
    statement.body.map(evalStatement);
    blockMemory = previousMemory;
  }
}

function evalClassDeclar(statement: ClassStatement): void {
  const className = statement.name.value;
  if (classes[className]) {
    throw new RuntimeError(`La classe '${className}' est déjà définie`, statement.name.position);
  }
  const methods: Record<string, FunctionStatement> = {};
  // Héritage : copier les méthodes du parent si besoin
  let parent: string | undefined = undefined;
  if (statement.parent) {
    const parentName = statement.parent.value;
    parent = parentName;
    const parentClass = classes[parentName];
    if (!parentClass) {
      throw new RuntimeError(`Classe parente '${parentName}' non trouvée`, statement.parent.position);
    }
    for (const [m, fn] of Object.entries(parentClass.methods)) {
      methods[m] = fn;
    }
  }
  for (const method of statement.methods) {
    if (method.name.value.startsWith("static_")) {
      if (!staticMethods[className]) staticMethods[className] = {};
      staticMethods[className][method.name.value.slice(7)] = method;
    } else {
      methods[method.name.value] = method;
    }
  }
  classes[className] = { methods, parent };
  blockMemory.define(className, className);
}

function findMethodInHierarchy(className: string, methodName: string): FunctionStatement | undefined {
  let current = className;
  while (current) {
    const classDef = classes[current];
    if (classDef && classDef.methods[methodName]) {
      return classDef.methods[methodName];
    }
    if (classDef && classDef.parent) {
      current = classDef.parent;
    } else {
      break;
    }
  }
  return undefined;
}

function evalFieldAccess(expr: FieldAccessExpression): Value {
  const object = evalExpression(expr.object);
  // Accès à une méthode statique : NomClasse.methode
  if (typeof object === "string" && staticMethods[object] && expr.field in staticMethods[object]) {
    return { __method__: staticMethods[object][expr.field], __instance__: null };
  }
  if (isInstance(object)) {
    if (expr.field in object.fields) {
      return object.fields[expr.field] as Value;
    } else {
      // Recherche la méthode dans la hiérarchie
      const method = findMethodInHierarchy(object.className, expr.field);
      if (method) {
        return { __method__: method, __instance__: object };
      }
      throw new RuntimeError(`Le champ ou la méthode '${expr.field}' n'existe pas dans l'instance de ${object.className}`, expr.position);
    }
  }
  throw new RuntimeError(`Accès par point non supporté pour ce type`, expr.position);
}

function evalFieldAssignment(expr: FieldAssignmentExpression): Value {
  const object = evalExpression(expr.object);
  if (isInstance(object)) {
    object.fields[expr.field] = evalExpression(expr.value) as Value;
    return object.fields[expr.field];
  }
  throw new RuntimeError(`Affectation de champ non supportée pour ce type`, expr.position);
}

function evalInstanceOf(expr: InstanceOfExpression): boolean {
  let obj = evalExpression(expr.object);
  if (!isInstance(obj)) return false;
  let className = obj.className;
  while (className) {
    if (className === expr.className) return true;
    const classDef = classes[className];
    if (!classDef) break;
    // Recherche du parent
    const parent = Object.values(classDef.methods).find(m => m.name.value.toLowerCase() === "extends");
    if (parent) {
      className = parent.name.value;
    } else {
      break;
    }
  }
  return false;
}

/**
 * Narrow types
 */

function ensureNumbers(
  values: unknown[],
  message: string,
  expression: Expression,
): asserts values is number[] {
  ensureType(values, "number", message, expression);
}

function ensureNumber(
  values: unknown,
  message: string,
  expression: Expression,
): asserts values is number {
  ensureType(values, "number", message, expression);
}

function ensureStrings(
  values: unknown[],
  message: string,
  expression: Expression,
): asserts values is string[] {
  ensureType(values, "string", message, expression);
}

function ensureBoolean(
  value: unknown,
  message: string,
  expression: Expression,
): asserts value is boolean {
  ensureType(value, "boolean", message, expression);
}

function ensureType(
  value: unknown,
  type: "number" | "string" | "boolean",
  message: string,
  expression: Expression,
) {
  if (Array.isArray(value)) {
    value.forEach((v) => ensureType(v, type, message, expression));
    return;
  }
  if (typeof value !== type) {
    throw new RuntimeError(message + ` (${typeof value})`, expression.position);
  }
}

function isInstance(val: any): val is Instance {
  return val && typeof val === "object" && typeof val.className === "string" && val.fields !== undefined;
}
