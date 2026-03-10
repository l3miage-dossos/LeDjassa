<template>
  <div class="page">
    <div class="page-header">
      <h1 class="page-title">Articles</h1>
      <p class="page-subtitle">Liste des articles via l'API JSONPlaceholder</p>
    </div>


    <div class="toolbar" style="margin-bottom:1.5rem">
      <div class="search-wrap" style="flex:1">
        <span class="search-icon">🔍</span>
        <input v-model="search" type="search" class="input search-input" placeholder="Rechercher un article…" />
      </div>
    </div>


    <div v-if="error" class="error-banner">⚠ {{ error }}</div>


    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Chargement des articles…</p>
    </div>


    <div v-else class="posts-grid">
      <RouterLink
        v-for="post in filteredPosts"
        :key="post.id"
        :to="`/posts/${post.id}`"
        class="post-card card"
      >
        <div class="post-num">#{{ post.id }}</div>
        <h3 class="post-title">{{ post.title }}</h3>
        <p class="post-body">{{ post.body }}</p>
        <div class="post-footer">
          <span class="badge badge-accent">Article</span>
          <span class="post-link">Lire →</span>
        </div>
      </RouterLink>
    </div>

    <div v-if="!loading && !filteredPosts.length" class="empty-state">
      <div class="icon">📄</div>
      <h3>Aucun article trouvé</h3>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { postService } from '@/services/api'

const posts = ref([])
const loading = ref(false)
const error = ref(null)
const search = ref('')

const filteredPosts = computed(() => {
  if (!search.value.trim()) return posts.value
  const q = search.value.toLowerCase()
  return posts.value.filter(p => p.title.includes(q) || p.body.includes(q))
})

onMounted(async () => {
  loading.value = true
  try {
    const { data } = await postService.getAll({ _limit: 24 })
    posts.value = data
  } catch (err) {
    error.value = err.message || 'Erreur de chargement'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.toolbar { display: flex; gap: 1rem; }
.search-wrap { position: relative; }
.search-icon { position: absolute; left: 0.9rem; top: 50%; transform: translateY(-50%); font-size: 0.85rem; pointer-events: none; }
.search-input { padding-left: 2.25rem; }

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}
.post-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  cursor: pointer;
  transition: all var(--transition);
}
.post-card:hover { transform: translateY(-2px); box-shadow: var(--shadow), var(--shadow-accent); border-color: var(--accent); }
.post-num { font-size: 0.72rem; color: var(--text-3); font-family: var(--font-display); }
.post-title {
  font-size: 0.95rem;
  font-family: var(--font-display);
  font-weight: 600;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.post-body {
  font-size: 0.82rem;
  color: var(--text-2);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
  line-height: 1.6;
}
.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 0.5rem;
  border-top: 1px solid var(--border);
}
.post-link { font-size: 0.82rem; color: var(--accent); font-weight: 600; }
</style>
