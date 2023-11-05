import { ref, computed } from 'vue'
import { acceptHMRUpdate, defineStore } from 'pinia'
import type { iKanbanStory } from '@/types/KanbanTypes'

export const useStoryStore = defineStore('story', () => {
  const storyId = ref(0)
  const storyTitle = ref('')
  const storyBody = ref('')

  const story = computed<iKanbanStory>(() => {
    return {
      id: storyId.value,
      title: storyTitle.value,
      body: storyBody.value
    }
  })
  function setStory(story: iKanbanStory) {
    storyId.value = story.id
    storyTitle.value = story.title
    storyBody.value = story.body
  }
  function setStoryId(id: number) {
    storyId.value = id
  }
  function setStoryTitle(title: string) {
    storyTitle.value = title
  }
  function setStoryBody(body: string) {
    storyBody.value = body
  }
  return { story, setStory, setStoryId, setStoryTitle, setStoryBody }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStoryStore, import.meta.hot))
}
