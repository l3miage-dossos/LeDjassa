/**
 * Store Pinia — Gestion des tâches (Todos)
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { todoService } from '@/services/api'

export const useTodoStore = defineStore('todos', () => {

  const todos = ref([])
  const loading = ref(false)
  const error = ref(null)
  const filter = ref('all')
  const searchQuery = ref('')


  const filteredTodos = computed(() => {
    let result = todos.value


    if (filter.value === 'active') result = result.filter(t => !t.completed)
    if (filter.value === 'completed') result = result.filter(t => t.completed)

    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase()
      result = result.filter(t => t.title.toLowerCase().includes(q))
    }

    return result
  })

  const stats = computed(() => ({
    total: todos.value.length,
    completed: todos.value.filter(t => t.completed).length,
    active: todos.value.filter(t => !t.completed).length,
    completionRate: todos.value.length
      ? Math.round((todos.value.filter(t => t.completed).length / todos.value.length) * 100)
      : 0
  }))


  async function fetchTodos(limit = 20) {
    loading.value = true
    error.value = null
    try {
      const { data } = await todoService.getAll({ _limit: limit })
      todos.value = data
    } catch (err) {
      error.value = err.message || 'Erreur lors du chargement'
    } finally {
      loading.value = false
    }
  }

  async function addTodo(title) {
    try {
      const { data } = await todoService.create({
        title,
        completed: false,
        userId: 1
      })

      todos.value.unshift({ ...data, id: Date.now() })
    } catch (err) {
      error.value = err.message
    }
  }

  async function toggleTodo(id) {
    const todo = todos.value.find(t => t.id === id)
    if (!todo) return
    const prev = todo.completed
    todo.completed = !prev
    try {
      await todoService.patch(id, { completed: todo.completed })
    } catch (err) {
      todo.completed = prev
      error.value = err.message
    }
  }

  async function deleteTodo(id) {
    const index = todos.value.findIndex(t => t.id === id)
    if (index === -1) return
    const removed = todos.value.splice(index, 1)[0]
    try {
      await todoService.delete(id)
    } catch (err) {
      todos.value.splice(index, 0, removed)
      error.value = err.message
    }
  }

  async function updateTodo(id, title) {
    const todo = todos.value.find(t => t.id === id)
    if (!todo) return
    const prev = todo.title
    todo.title = title
    try {
      await todoService.patch(id, { title })
    } catch (err) {
      todo.title = prev
      error.value = err.message
    }
  }

  function setFilter(f) { filter.value = f }
  function setSearch(q) { searchQuery.value = q }
  function clearError() { error.value = null }

  return {
    todos, loading, error, filter, searchQuery,
    filteredTodos, stats,
    fetchTodos, addTodo, toggleTodo, deleteTodo, updateTodo,
    setFilter, setSearch, clearError
  }
})
