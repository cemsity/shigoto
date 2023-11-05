import { ref, computed } from 'vue'
import { acceptHMRUpdate, defineStore } from 'pinia'
import type { iKanbanStory } from '@/types/KanbanTypes'

export const useStoriesStore = defineStore('stories', () => {
  const stories = ref<iKanbanStory[]>([])
  return { stories }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoriesStore, import.meta.hot))
}
