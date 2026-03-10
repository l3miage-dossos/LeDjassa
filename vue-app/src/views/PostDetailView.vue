<template>
  <div class="page">
    <button class="btn btn-ghost btn-sm back-btn" @click="$router.back()">← Retour</button>

    <div v-if="loading" class="loading-state"><div class="spinner"></div><p>Chargement…</p></div>
    <div v-else-if="error" class="error-banner">⚠ {{ error }}</div>

    <template v-else-if="post">
      <article class="post-article card">
        <div class="post-meta">
          <span class="badge badge-accent">Article #{{ post.id }}</span>
          <span class="post-user">Auteur · Utilisateur {{ post.userId }}</span>
        </div>
        <h1 class="post-head">{{ post.title }}</h1>
        <p class="post-content">{{ post.body }}</p>
      </article>

      <div class="comments-section">
        <h2 class="comments-title">Commentaires <span class="count-badge">{{ comments.length }}</span></h2>

        <div v-if="commentsLoading" class="loading-state"><div class="spinner"></div></div>
        <div v-else class="comments-list">
          <div v-for="c in comments" :key="c.id" class="comment card">
            <div class="comment-header">
              <div class="comment-avatar">{{ c.name[0].toUpperCase() }}</div>
              <div>
                <p class="comment-name">{{ c.name }}</p>
                <p class="comment-email">{{ c.email }}</p>
              </div>
            </div>
            <p class="comment-body">{{ c.body }}</p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { postService } from '@/services/api'

const route = useRoute()
const post = ref(null)
const comments = ref([])
const loading = ref(false)
const commentsLoading = ref(false)
const error = ref(null)

onMounted(async () => {
  const id = route.params.id
  loading.value = true
  try {
    const [postRes] = await Promise.all([postService.getById(id)])
    post.value = postRes.data
    commentsLoading.value = true
    const cRes = await postService.getComments(id)
    comments.value = cRes.data
  } catch (err) {
    error.value = err.message || 'Erreur'
  } finally {
    loading.value = false
    commentsLoading.value = false
  }
})
</script>

<style scoped>
.back-btn { margin-bottom: 1.5rem; }
.post-article { margin-bottom: 2rem; }
.post-meta { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
.post-user { font-size: 0.82rem; color: var(--text-3); }
.post-head { font-size: clamp(1.3rem, 3vw, 2rem); margin-bottom: 1rem; line-height: 1.3; }
.post-content { color: var(--text-2); line-height: 1.8; font-size: 0.95rem; }

.comments-section { margin-top: 2rem; }
.comments-title { font-size: 1.1rem; margin-bottom: 1rem; display: flex; align-items: center; gap: 0.75rem; }
.count-badge {
  background: var(--surface-2);
  border: 1px solid var(--border);
  padding: 0.1rem 0.5rem;
  border-radius: 99px;
  font-size: 0.78rem;
  color: var(--text-2);
  font-family: var(--font-body);
  font-weight: 500;
}

.comments-list { display: flex; flex-direction: column; gap: 0.75rem; }
.comment { padding: 1.25rem; }
.comment-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; }
.comment-avatar {
  width: 36px; height: 36px;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 0.9rem;
  flex-shrink: 0;
}
.comment-name { font-size: 0.875rem; font-weight: 600; }
.comment-email { font-size: 0.75rem; color: var(--text-3); }
.comment-body { font-size: 0.875rem; color: var(--text-2); line-height: 1.7; }
</style>
