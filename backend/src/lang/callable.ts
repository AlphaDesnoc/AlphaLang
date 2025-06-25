import { Value } from "./type.ts";

export class Callable {
  constructor(
    public arity: number,
    public call: (...args: Value[]) => Value | void,
  ) {}
}

export type Instance = {
  className: string;
  fields: Record<string, Value>;
};
