<template>
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">Bonjour, {{ auth.userName.split(' ')[0] }} 👋</h1>
      <p class="page-subtitle">Voici un aperçu de votre activité</p>
    </div>


    <div class="stats-grid">
      <div v-for="stat in statsCards" :key="stat.label" class="stat-card card">
        <div class="stat-icon" :style="{ background: stat.color }">{{ stat.icon }}</div>
        <div>
          <p class="stat-value">{{ stat.value }}</p>
          <p class="stat-label">{{ stat.label }}</p>
        </div>
      </div>
    </div>

    <div class="card progress-card">
      <div class="progress-header">
        <span>Progression globale</span>
        <span class="progress-pct">{{ todos.stats.completionRate }}%</span>
      </div>
      <div class="progress-bar" style="height:8px; margin-top: 0.75rem;">
        <div class="progress-fill" :style="{ width: todos.stats.completionRate + '%' }"></div>
      </div>
      <p class="progress-hint">{{ todos.stats.completed }} tâches complétées sur {{ todos.stats.total }}</p>
    </div>


    <div class="section">
      <div class="section-header">
        <h2 class="section-title">Tâches récentes</h2>
        <RouterLink to="/tasks" class="btn btn-ghost btn-sm">Voir tout →</RouterLink>
      </div>

      <div v-if="todos.loading" class="loading-state">
        <div class="spinner"></div>
        <p>Chargement…</p>
      </div>

      <div v-else class="recent-tasks">
        <div
          v-for="task in recentTasks"
          :key="task.id"
          class="task-row"
          :class="{ 'task-row--done': task.completed }"
        >
          <div class="task-check" :class="{ 'task-check--done': task.completed }">
            <span v-if="task.completed">✓</span>
          </div>
          <span class="task-title-text">{{ task.title }}</span>
          <span class="badge" :class="task.completed ? 'badge-success' : 'badge-warning'">
            {{ task.completed ? 'Terminé' : 'En cours' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useTodoStore } from '@/store/todos'

const auth = useAuthStore()
const todos = useTodoStore()

onMounted(() => {
  if (!todos.todos.length) todos.fetchTodos(20)
})

const statsCards = computed(() => [
  { label: 'Tâches totales', value: todos.stats.total, icon: '◈', color: 'rgba(108,99,255,0.15)' },
  { label: 'En cours', value: todos.stats.active, icon: '◷', color: 'rgba(255,197,0,0.15)' },
  { label: 'Terminées', value: todos.stats.completed, icon: '✓', color: 'rgba(0,212,170,0.15)' },
  { label: 'Progression', value: todos.stats.completionRate + '%', icon: '⬡', color: 'rgba(255,107,157,0.15)' },
])

const recentTasks = computed(() => todos.todos.slice(0, 6))
</script>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.stat-card { display: flex; align-items: center; gap: 1rem; }
.stat-icon {
  width: 48px; height: 48px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  font-size: 1.2rem;
  flex-shrink: 0;
}
.stat-value { font-family: var(--font-display); font-size: 1.6rem; font-weight: 700; }
.stat-label { color: var(--text-2); font-size: 0.82rem; }

.progress-card { margin-bottom: 2rem; }
.progress-header { display: flex; justify-content: space-between; align-items: center; color: var(--text-2); font-size: 0.9rem; }
.progress-pct { font-family: var(--font-display); font-weight: 700; color: var(--accent); font-size: 1rem; }
.progress-hint { margin-top: 0.5rem; font-size: 0.8rem; color: var(--text-3); }

.section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
.section-title { font-size: 1.1rem; }
.section { margin-top: 1rem; }

.recent-tasks { display: flex; flex-direction: column; gap: 0.5rem; }
.task-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  transition: border-color var(--transition);
}
.task-row:hover { border-color: var(--border-hover); }
.task-row--done .task-title-text { text-decoration: line-through; color: var(--text-3); }
.task-check {
  width: 22px; height: 22px;
  border: 2px solid var(--border);
  border-radius: 6px;
  display: grid;
  place-items: center;
  font-size: 0.7rem;
  flex-shrink: 0;
}
.task-check--done { background: var(--accent-3); border-color: var(--accent-3); color: #000; }
.task-title-text { flex: 1; font-size: 0.9rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
</style>
