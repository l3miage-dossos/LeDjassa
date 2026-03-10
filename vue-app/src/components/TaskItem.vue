<template>
  <div class="task-item" :class="{ 'task-item--done': task.completed }">

    <button class="check-btn" :class="{ 'check-btn--done': task.completed }" @click="$emit('toggle')" :title="task.completed ? 'Marquer en cours' : 'Marquer terminé'">
      <span v-if="task.completed">✓</span>
    </button>

    <div class="task-body" v-if="!editing">
      <span class="task-text">{{ task.title }}</span>
      <span class="task-id">#{{ task.id }}</span>
    </div>
    <div class="task-body" v-else>
      <input
        ref="editInput"
        v-model="editTitle"
        class="input edit-input"
        @keydown.enter="saveEdit"
        @keydown.escape="cancelEdit"
        @blur="saveEdit"
      />
    </div>

    <div class="task-actions">
      <span class="badge" :class="task.completed ? 'badge-success' : 'badge-warning'" style="font-size:0.7rem">
        {{ task.completed ? '✓' : '…' }}
      </span>
      <button v-if="!editing" class="action-btn" @click="startEdit" title="Modifier">✎</button>
      <button v-else class="action-btn action-btn--save" @click="saveEdit" title="Enregistrer">✓</button>
      <button class="action-btn action-btn--del" @click="$emit('delete')" title="Supprimer">✕</button>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const props = defineProps({ task: Object })
const emit = defineEmits(['toggle', 'delete', 'update'])

const editing = ref(false)
const editTitle = ref('')
const editInput = ref(null)

function startEdit() {
  editTitle.value = props.task.title
  editing.value = true
  nextTick(() => editInput.value?.focus())
}
function saveEdit() {
  if (editTitle.value.trim() && editTitle.value !== props.task.title) {
    emit('update', editTitle.value.trim())
  }
  editing.value = false
}
function cancelEdit() {
  editing.value = false
}
</script>

<style scoped>
.task-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.8rem 1rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  transition: all var(--transition);
}
.task-item:hover { border-color: var(--border-hover); box-shadow: var(--shadow); }
.task-item--done { opacity: 0.6; }

.check-btn {
  width: 24px; height: 24px;
  border: 2px solid var(--border);
  border-radius: 6px;
  background: transparent;
  display: grid;
  place-items: center;
  font-size: 0.75rem;
  cursor: pointer;
  flex-shrink: 0;
  transition: all var(--transition);
  color: #000;
}
.check-btn:hover { border-color: var(--accent-3); }
.check-btn--done { background: var(--accent-3); border-color: var(--accent-3); }

.task-body { flex: 1; display: flex; align-items: center; gap: 0.5rem; min-width: 0; }
.task-text {
  font-size: 0.9rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.task-item--done .task-text { text-decoration: line-through; color: var(--text-3); }
.task-id { font-size: 0.72rem; color: var(--text-3); flex-shrink: 0; }
.edit-input { padding: 0.3rem 0.6rem; font-size: 0.9rem; }

.task-actions { display: flex; align-items: center; gap: 0.4rem; flex-shrink: 0; }
.action-btn {
  width: 28px; height: 28px;
  border-radius: 6px;
  background: var(--surface-2);
  border: 1px solid var(--border);
  color: var(--text-2);
  font-size: 0.8rem;
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: all var(--transition);
}
.action-btn:hover { border-color: var(--border-hover); color: var(--text); }
.action-btn--save { border-color: var(--accent-3); color: var(--accent-3); }
.action-btn--del:hover { background: rgba(255,80,80,0.1); border-color: rgba(255,80,80,0.3); color: #ff6060; }
</style>
