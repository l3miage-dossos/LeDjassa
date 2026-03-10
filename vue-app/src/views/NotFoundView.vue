<template>
  <div class="notfound">
    <div class="notfound-code">404</div>
    <h1 class="notfound-title">Page introuvable</h1>
    <p class="notfound-text">La page que vous cherchez n'existe pas ou a été déplacée.</p>
    <RouterLink to="/" class="btn btn-primary">← Retour au tableau de bord</RouterLink>
  </div>
</template>

<style scoped>
.notfound {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  gap: 1rem;
}
.notfound-code {
  font-family: var(--font-display);
  font-size: clamp(5rem, 15vw, 10rem);
  font-weight: 800;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}
.notfound-title { font-size: 1.5rem; }
.notfound-text { color: var(--text-2); max-width: 360px; }
</style>
