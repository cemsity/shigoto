import { ref, computed } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'
import type { iKanbanTemplate } from '@/types/KanbanTypes'

export const useTemplateStore = defineStore('template', () => {
  const templates = ref<iKanbanTemplate[]>([])

  const getTemplates = computed(() => {
    return templates.value
  })
  const setFrom = (temps: iKanbanTemplate[]) => {
    templates.value = temps
  }

  return { templates, getTemplates, setFrom }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTemplateStore, import.meta.hot))
}
