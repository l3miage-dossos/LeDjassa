<template>
  <aside class="sidebar">
    <div class="sidebar-brand">
      <div class="brand-icon">T</div>
      <span class="brand-name">TaskBoard</span>
    </div>

    <nav class="sidebar-nav">
      <p class="nav-label">Navigation</p>
      <RouterLink v-for="item in navItems" :key="item.to" :to="item.to" class="nav-item" active-class="nav-item--active">
        <span class="nav-icon">{{ item.icon }}</span>
        <span>{{ item.label }}</span>
        <span v-if="item.badge" class="nav-badge">{{ item.badge }}</span>
      </RouterLink>
    </nav>

    <div class="sidebar-footer">
      <div class="user-info">
        <img :src="auth.user?.avatar" :alt="auth.userName" class="avatar" />
        <div>
          <p class="user-name">{{ auth.userName }}</p>
          <p class="user-email">{{ auth.user?.email }}</p>
        </div>
      </div>
      <button class="btn btn-ghost btn-sm logout-btn" @click="auth.logout(); $router.push('/login')">
        ↩ Déconnexion
      </button>
    </div>
  </aside>
</template>

<script setup>
import { useAuthStore } from '@/store/auth'
import { useTodoStore } from '@/store/todos'
import { computed } from 'vue'

const auth = useAuthStore()
const todos = useTodoStore()

const navItems = computed(() => [
  { to: '/', label: 'Dashboard', icon: '⬡' },
  { to: '/tasks', label: 'Tâches', icon: '✓', badge: todos.stats.active || null },
  { to: '/posts', label: 'Articles', icon: '◈' },
])
</script>

<style scoped>
.sidebar {
  position: fixed;
  left: 0; top: 0; bottom: 0;
  width: 240px;
  background: var(--surface);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  z-index: 100;
  padding: 1.5rem 1rem;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  margin-bottom: 2rem;
}
.brand-icon {
  width: 36px; height: 36px;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  border-radius: 10px;
  display: grid;
  place-items: center;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.1rem;
  color: #fff;
}
.brand-name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.1rem;
}

.nav-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-3);
  font-weight: 600;
  padding: 0 0.5rem;
  margin-bottom: 0.5rem;
}

.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 0.75rem;
  border-radius: var(--radius-sm);
  color: var(--text-2);
  font-size: 0.9rem;
  font-weight: 500;
  transition: all var(--transition);
  position: relative;
}
.nav-item:hover {
  background: var(--surface-2);
  color: var(--text);
}
.nav-item--active {
  background: rgba(108,99,255,0.12);
  color: var(--accent);
}
.nav-item--active .nav-icon { opacity: 1; }

.nav-icon { font-size: 1rem; opacity: 0.6; transition: opacity var(--transition); }
.nav-badge {
  margin-left: auto;
  background: var(--accent);
  color: #fff;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 0.1rem 0.45rem;
  border-radius: 99px;
  min-width: 18px;
  text-align: center;
}

.sidebar-footer {
  border-top: 1px solid var(--border);
  padding-top: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0 0.25rem;
}
.avatar {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: var(--surface-2);
  border: 2px solid var(--border);
}
.user-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text);
}
.user-email {
  font-size: 0.75rem;
  color: var(--text-3);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 130px;
}
.logout-btn { width: 100%; justify-content: center; }
</style>
