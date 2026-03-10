<template>
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">Mes tâches</h1>
      <p class="page-subtitle">Gérez vos tâches — CRUD complet via JSONPlaceholder API</p>
    </div>

    <div class="toolbar">
      <div class="search-wrap">
        <span class="search-icon">🔍</span>
        <input
          v-model="searchInput"
          type="search"
          class="input search-input"
          placeholder="Rechercher une tâche…"
          @input="todos.setSearch(searchInput)"
        />
      </div>
      <div class="filters">
        <button
          v-for="f in filters"
          :key="f.value"
          class="filter-btn"
          :class="{ 'filter-btn--active': todos.filter === f.value }"
          @click="todos.setFilter(f.value)"
        >
          {{ f.label }}
          <span class="filter-count">{{ f.count }}</span>
        </button>
      </div>
    </div>


    <div class="add-task-form">
      <input
        v-model="newTitle"
        type="text"
        class="input"
        placeholder="+ Nouvelle tâche… (Appuyez sur Entrée)"
        @keydown.enter="addTask"
        :disabled="adding"
      />
      <button class="btn btn-primary" @click="addTask" :disabled="adding || !newTitle.trim()">
        <span v-if="adding" class="btn-spinner-sm"></span>
        Ajouter
      </button>
    </div>


    <Transition name="fade">
      <div v-if="todos.error" class="error-banner">
        ⚠ {{ todos.error }}
        <button class="btn btn-ghost btn-sm" style="margin-left:auto" @click="todos.clearError()">✕</button>
      </div>
    </Transition>


    <div v-if="todos.loading" class="loading-state">
      <div class="spinner"></div>
      <p>Chargement des tâches…</p>
    </div>


    <div v-else-if="!todos.filteredTodos.length" class="empty-state">
      <div class="icon">📋</div>
      <h3>Aucune tâche trouvée</h3>
      <p>Modifiez votre recherche ou ajoutez une nouvelle tâche</p>
    </div>


    <TransitionGroup v-else name="list" tag="div" class="task-list">
      <TaskItem
        v-for="task in todos.filteredTodos"
        :key="task.id"
        :task="task"
        @toggle="todos.toggleTodo(task.id)"
        @delete="todos.deleteTodo(task.id)"
        @update="(title) => todos.updateTodo(task.id, title)"
      />
    </TransitionGroup>

    <p class="task-count">{{ todos.filteredTodos.length }} tâche(s) affichée(s)</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useTodoStore } from '@/store/todos'
import TaskItem from '@/components/TaskItem.vue'

const todos = useTodoStore()

const searchInput = ref('')
const newTitle = ref('')
const adding = ref(false)

onMounted(() => {
  if (!todos.todos.length) todos.fetchTodos(30)
})

const filters = computed(() => [
  { value: 'all', label: 'Toutes', count: todos.stats.total },
  { value: 'active', label: 'En cours', count: todos.stats.active },
  { value: 'completed', label: 'Terminées', count: todos.stats.completed },
])

async function addTask() {
  if (!newTitle.value.trim() || adding.value) return
  adding.value = true
  await todos.addTodo(newTitle.value.trim())
  newTitle.value = ''
  adding.value = false
}
</script>

<style scoped>
.toolbar {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 1.25rem;
}
.search-wrap { position: relative; flex: 1; min-width: 200px; }
.search-icon { position: absolute; left: 0.9rem; top: 50%; transform: translateY(-50%); font-size: 0.85rem; pointer-events: none; }
.search-input { padding-left: 2.25rem; }

.filters { display: flex; gap: 0.5rem; }
.filter-btn {
  display: flex; align-items: center; gap: 0.4rem;
  padding: 0.5rem 0.9rem;
  border-radius: var(--radius-sm);
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text-2);
  font-size: 0.85rem;
  font-weight: 500;
  transition: all var(--transition);
  cursor: pointer;
}
.filter-btn:hover { border-color: var(--border-hover); color: var(--text); }
.filter-btn--active { background: rgba(108,99,255,0.12); border-color: var(--accent); color: var(--accent); }
.filter-count {
  background: var(--surface-2);
  padding: 0.1rem 0.4rem;
  border-radius: 99px;
  font-size: 0.72rem;
  color: var(--text-3);
}

.add-task-form {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}
.add-task-form .input { flex: 1; }

.task-list { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem; }
.task-count { text-align: center; color: var(--text-3); font-size: 0.8rem; padding: 0.5rem; }

.btn-spinner-sm {
  width: 14px; height: 14px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
