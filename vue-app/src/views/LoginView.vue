<template>
  <div class="login-page">
    <div class="login-bg">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
    </div>

    <div class="login-card">
      <div class="login-logo">
        <div class="logo-icon">T</div>
        <h1 class="logo-title">TaskBoard</h1>
        <p class="logo-sub">Votre espace de travail</p>
      </div>

      <Transition name="fade">
        <div v-if="error" class="error-banner">⚠ {{ error }}</div>
      </Transition>

      <form class="login-form" @submit.prevent="handleLogin">
        <div class="field">
          <label class="label" for="email">Adresse e-mail</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            class="input"
            placeholder="vous@exemple.com"
            autocomplete="email"
            required
          />
        </div>
        <div class="field">
          <label class="label" for="password">Mot de passe</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            class="input"
            placeholder="••••••••"
            autocomplete="current-password"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary login-btn" :disabled="loading">
          <span v-if="loading" class="btn-spinner"></span>
          {{ loading ? 'Connexion…' : 'Se connecter' }}
        </button>
      </form>

      <p class="login-hint">
        💡 Entrez n'importe quel e-mail et mot de passe pour accéder à la démo
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const form = ref({ email: '', password: '' })
const error = ref(null)
const loading = ref(false)

async function handleLogin() {
  error.value = null
  loading.value = true
  await new Promise(r => setTimeout(r, 800)) // simule latence réseau
  const success = auth.login(form.value)
  loading.value = false
  if (success) {
    router.push(route.query.redirect || '/')
  } else {
    error.value = 'Identifiants invalides. Veuillez réessayer.'
  }
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}
.login-bg { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
}
.blob-1 {
  width: 500px; height: 500px;
  background: var(--accent);
  top: -100px; left: -150px;
  animation: drift 8s ease-in-out infinite alternate;
}
.blob-2 {
  width: 400px; height: 400px;
  background: var(--accent-2);
  bottom: -80px; right: -100px;
  animation: drift 10s ease-in-out infinite alternate-reverse;
}
@keyframes drift {
  from { transform: translate(0, 0) scale(1); }
  to { transform: translate(40px, 30px) scale(1.05); }
}

.login-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 2.5rem 2.25rem;
  width: 100%;
  max-width: 400px;
  box-shadow: var(--shadow), var(--shadow-accent);
  position: relative;
  z-index: 1;
  animation: cardIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) both;
}
@keyframes cardIn {
  from { opacity: 0; transform: translateY(24px) scale(0.97); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.login-logo { text-align: center; margin-bottom: 2rem; }
.logo-icon {
  width: 56px; height: 56px;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  border-radius: 16px;
  display: grid;
  place-items: center;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 1.5rem;
  color: #fff;
  margin: 0 auto 1rem;
  box-shadow: 0 8px 24px rgba(108,99,255,0.3);
}
.logo-title { font-size: 1.6rem; margin-bottom: 0.25rem; }
.logo-sub { color: var(--text-2); font-size: 0.875rem; }

.login-form { display: flex; flex-direction: column; gap: 1.25rem; margin-bottom: 1.5rem; }
.field { display: flex; flex-direction: column; gap: 0.4rem; }
.label { font-size: 0.85rem; font-weight: 500; color: var(--text-2); }
.login-btn { width: 100%; justify-content: center; padding: 0.75rem; font-size: 0.95rem; position: relative; }
.login-btn:disabled { opacity: 0.7; cursor: not-allowed; }

.btn-spinner {
  width: 16px; height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.login-hint {
  text-align: center;
  font-size: 0.78rem;
  color: var(--text-3);
  background: var(--surface-2);
  border-radius: var(--radius-sm);
  padding: 0.65rem 1rem;
  border: 1px solid var(--border);
}
</style>
