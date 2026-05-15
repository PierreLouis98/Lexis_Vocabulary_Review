# Test API - Lexis Vocabulary Review

Lance les tests de tous les endpoints du backend Express en mode mock (sans base de données).

## Étapes

1. Démarre le backend sur le port 3001 en mode mock (`NODE_ENV=development`)
2. Teste dans l'ordre :
   - `GET /api/health` → serveur en ligne
   - `POST /api/auth/register` → inscription d'un utilisateur test
   - `POST /api/auth/login` → connexion et récupération du token JWT
   - `GET /api/words` → liste des mots (avec token)
   - `GET /api/words/exercise` → données d'exercice (avec token)
   - `POST /api/words/:id/result` → soumettre un résultat d'exercice (avec token)
   - `GET /api/library` → bibliothèque de l'utilisateur (avec token)
3. Pour chaque endpoint, affiche : ✅ succès ou ❌ échec + le code HTTP + un extrait de la réponse
4. Affiche un résumé final : X/Y endpoints OK
5. Arrête le serveur backend après les tests

Utilise `curl` pour les requêtes HTTP. Stocke le token JWT entre les appels.
