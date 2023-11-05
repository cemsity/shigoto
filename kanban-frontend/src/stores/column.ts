import { ref, computed } from 'vue'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { useStoryStore } from './story'
import type { iKanbanStage, iKanbanStory } from '@/types/KanbanTypes'

export const useColumnStore = defineStore('column', () => {
  const column = ref<iKanbanStage>({
    id: 0,
    title: '',
    stories: []
  })

  function setColumn(col: iKanbanStage) {
    column.value = col
  }

  return { column }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useColumnStore, import.meta.hot))
}
