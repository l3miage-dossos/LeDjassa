<template>
  <div id="app-root">
    <template v-if="auth.isAuthenticated">
      <AppSidebar />
      <main class="app-main">
        <AppTopBar />
        <RouterView v-slot="{ Component }">
          <Transition name="fade" mode="out-in">
            <component :is="Component" :key="$route.path" />
          </Transition>
        </RouterView>
      </main>
    </template>
    <template v-else>
      <RouterView />
    </template>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/store/auth'
import AppSidebar from '@/components/AppSidebar.vue'
import AppTopBar from '@/components/AppTopBar.vue'

const auth = useAuthStore()
</script>

<style scoped>
#app-root {
  display: flex;
  min-height: 100vh;
}
.app-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-left: 240px;
}
@media (max-width: 768px) {
  .app-main { margin-left: 0; }
}
</style>
