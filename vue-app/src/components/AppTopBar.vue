<template>
  <header class="topbar">
    <div class="topbar-left">
      <h2 class="page-path">{{ routeLabel }}</h2>
    </div>
    <div class="topbar-right">
      <div class="dark-toggle" title="Interface sombre active">🌙</div>
      <div class="status-dot" title="API connectée">
        <span class="dot dot--online"></span>
        <span class="status-text">API en ligne</span>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const labels = { Dashboard: 'Tableau de bord', Tasks: 'Mes tâches', Posts: 'Articles', PostDetail: 'Détail article' }
const routeLabel = computed(() => labels[route.name] || route.name || 'Page')
</script>

<style scoped>
.topbar {
  height: 60px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(12px);
}
.page-path {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-2);
  font-family: var(--font-body);
}
.topbar-right { display: flex; align-items: center; gap: 1.25rem; }
.dark-toggle { font-size: 1rem; cursor: pointer; }
.status-dot { display: flex; align-items: center; gap: 0.5rem; }
.dot { width: 8px; height: 8px; border-radius: 50%; }
.dot--online { background: var(--accent-3); box-shadow: 0 0 8px var(--accent-3); animation: pulse 2s ease infinite; }
.status-text { font-size: 0.78rem; color: var(--text-3); }
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>
