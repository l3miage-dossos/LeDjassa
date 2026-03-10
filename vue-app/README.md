# TaskBoard — Application Vue.js 3 complète

Application web moderne construite avec Vue.js 3, Pinia, Vue Router et Axios.

## 🚀 Démarrage rapide

```bash
# Installation des dépendances
npm install

# Serveur de développement
npm run dev

# Build de production
npm run build
```

L'application sera disponible sur **http://localhost:3000**

---

## 🏗️ Architecture du projet

```
src/
├── main.js                    # Point d'entrée — Pinia + Router + Vue
├── App.vue                    # Composant racine avec layout
│
├── assets/styles/
│   └── main.css               # Variables CSS, reset, composants globaux
│
├── router/
│   └── index.js               # Vue Router — routes + guards d'auth
│
├── store/
│   ├── auth.js                # Store Pinia — Authentification
│   └── todos.js               # Store Pinia — CRUD tâches
│
├── services/
│   ├── http.js                # Instance Axios + intercepteurs
│   └── api.js                 # Services API (todos, posts, users)
│
├── components/
│   ├── AppSidebar.vue          # Navigation latérale
│   ├── AppTopBar.vue           # Barre de navigation haute
│   └── TaskItem.vue            # Composant tâche avec édition inline
│
└── views/
    ├── LoginView.vue           # Page de connexion
    ├── DashboardView.vue       # Tableau de bord avec stats
    ├── TasksView.vue           # CRUD complet des tâches
    ├── PostsView.vue           # Liste des articles (API)
    ├── PostDetailView.vue      # Détail article + commentaires
    └── NotFoundView.vue        # Page 404
```

---

## ⚙️ Stack technique

| Technologie | Version | Rôle |
|---|---|---|
| **Vue.js** | 3.4 | Framework UI (Composition API) |
| **Vite** | 5.x | Bundler & serveur de dev |
| **Pinia** | 2.x | Gestion d'état |
| **Vue Router** | 4.x | Navigation SPA |
| **Axios** | 1.6 | Appels HTTP avec intercepteurs |

---

## 🔌 Architecture des appels API (Axios)

### Instance configurée (`src/services/http.js`)

```js
const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

// Intercepteur requête — ajout token Bearer automatique
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Intercepteur réponse — gestion centralisée des erreurs (401, 403, 404, 500)
apiClient.interceptors.response.use(
  response => response,
  error => Promise.reject({ status, message, original: error })
)
```

### Couche services (`src/services/api.js`)

```js
export const todoService = {
  getAll(params)   => http.get('/todos', { params }),
  getById(id)      => http.get(`/todos/${id}`),
  create(data)     => http.post('/todos', data),
  update(id, data) => http.put(`/todos/${id}`, data),
  patch(id, data)  => http.patch(`/todos/${id}`, data),
  delete(id)       => http.delete(`/todos/${id}`)
}
```

---

## 🗃️ Gestion d'état avec Pinia

### Pattern Optimistic Updates (dans `store/todos.js`)

```js
async function toggleTodo(id) {
  const todo = todos.value.find(t => t.id === id)
  const prev = todo.completed
  todo.completed = !prev          // Mise à jour immédiate (UX)
  try {
    await todoService.patch(id, { completed: todo.completed })
  } catch (err) {
    todo.completed = prev       // Revert en cas d'erreur
  }
}
```

---

## 🔐 Authentification

- Login simulé (démo) — accepte tout email/mot de passe
- Token stocké dans `localStorage`
- Injecté automatiquement via intercepteur Axios
- Guards de navigation Vue Router pour les routes protégées

---

## 🌐 API utilisée

**JSONPlaceholder** — https://jsonplaceholder.typicode.com

API REST gratuite pour prototypage. Endpoints utilisés :
- `GET /todos` — liste des tâches
- `POST /todos` — créer une tâche
- `PATCH /todos/:id` — mettre à jour
- `DELETE /todos/:id` — supprimer
- `GET /posts` — liste des articles
- `GET /posts/:id/comments` — commentaires d'un article

---

## 🔧 Personnalisation

Pour connecter votre propre API, modifiez `src/services/http.js` :

```js
const apiClient = axios.create({
  baseURL: 'https://votre-api.com/api/v1',
  // ...
})
```
