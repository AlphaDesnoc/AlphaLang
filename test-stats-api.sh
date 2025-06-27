#!/bin/bash

# Script de test pour les statistiques utilisateur
echo "🧪 Test des endpoints de statistiques AlphaLang"
echo "================================================="

API_BASE="http://localhost:3001/api"
USER_ID="test-user-123"

echo
echo "1. Test de récupération des statistiques générales..."
curl -X GET "$API_BASE/stats" \
  -H "Content-Type: application/json" \
  | jq '.'

echo
echo "2. Test de récupération des statistiques utilisateur..."
curl -X GET "$API_BASE/stats/$USER_ID" \
  -H "Content-Type: application/json" \
  | jq '.'

echo
echo "3. Test de mise à jour des statistiques utilisateur..."
curl -X POST "$API_BASE/stats/$USER_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "exerciseId": "hello-world",
    "passed": true,
    "score": 85,
    "points": 10
  }' \
  | jq '.'

echo
echo "4. Vérification des statistiques mises à jour..."
curl -X GET "$API_BASE/stats/$USER_ID" \
  -H "Content-Type: application/json" \
  | jq '.'

echo
echo "✅ Tests terminés!"
