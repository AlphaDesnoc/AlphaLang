#!/bin/bash

# Script de démarrage du backend AlphaLang

echo "🚀 Démarrage du backend AlphaLang..."

# Créer le dossier data s'il n'existe pas
mkdir -p ./data

# Démarrer le serveur en mode développement
bun --watch src/index.ts
