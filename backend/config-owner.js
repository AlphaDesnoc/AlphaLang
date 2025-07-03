#!/usr/bin/env node

/**
 * Script de configuration pour ajouter un utilisateur owner
 * Usage: node config-owner.js YOUR_FIREBASE_UID
 */

const fs = require('fs');
const path = require('path');

const PERMISSIONS_FILE = path.join(__dirname, 'src', 'services', 'permissions.ts');

function addOwnerToPermissions(uid) {
  if (!uid) {
    console.error('❌ UID Firebase requis');
    console.log('Usage: node config-owner.js YOUR_FIREBASE_UID');
    process.exit(1);
  }

  try {
    // Lire le fichier permissions.ts
    let content = fs.readFileSync(PERMISSIONS_FILE, 'utf8');
    
    // Trouver la ligne avec TODO et la remplacer
    const todoLine = "    // 'VOTRE_UID_FIREBASE': { canCreateOfficialExercises: true, role: 'owner' },";
    const ownerLine = `    '${uid}': { canCreateOfficialExercises: true, role: 'owner' },`;
    
    if (content.includes(todoLine)) {
      content = content.replace(todoLine, ownerLine);
      fs.writeFileSync(PERMISSIONS_FILE, content);
      
      console.log('✅ Configuration mise à jour !');
      console.log(`📋 UID ajouté: ${uid}`);
      console.log('🔄 Redémarrez le backend pour appliquer les changements');
    } else {
      console.log('⚠️  Ligne TODO non trouvée, ajout manuel requis');
      console.log(`Ajoutez cette ligne dans ${PERMISSIONS_FILE}:`);
      console.log(`'${uid}': { canCreateOfficialExercises: true, role: 'owner' },`);
    }
    
  } catch (error) {
    console.error('❌ Erreur lors de la configuration:', error.message);
  }
}

// Récupérer l'UID depuis les arguments
const uid = process.argv[2];
addOwnerToPermissions(uid);
