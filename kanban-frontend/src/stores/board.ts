import { ref, computed } from 'vue'
import { acceptHMRUpdate, defineStore } from 'pinia'
import type {
  iKanbanStory,
  iKanbanStageState,
  iKanbanStage,
  iKanbanBoardState,
  iKanbanBoard,
  iKanbanTemplate
} from '@/types/KanbanTypes'
import { useTemplateStore } from './template'
import { useColumnStore } from './column'

export const useBoardStore = defineStore('board', () => {
  const board = ref<iKanbanBoardState>({
    id: 0,
    title: '',
    owner: ''
  })
  const columns = ref<iKanbanStageState[]>([])

  const stories = ref<Map<number, iKanbanStory[]>>(new Map())

  const templateStore = useTemplateStore()
  const selectedColumnIndex = ref(-1)
  const selectedStoryIndex = ref(-1)
  const selectedStory = ref<iKanbanStory | null>(null)
  const numberOfStories = ref(0)

  const ready = ref(false)

  const stages = computed<iKanbanStage[]>(() => {
    return columns.value.map((stage) => {
      let storiez = stories.value.get(stage.id)
      if (!storiez) {
        storiez = []
      }
      return {
        id: stage.id,
        title: stage.title,
        stories: storiez
      }
    })
  })

  function setFrom(kanbanBoard: iKanbanBoard, templates: iKanbanTemplate[]) {
    board.value.id = kanbanBoard.id
    board.value.title = kanbanBoard.title
    board.value.owner = kanbanBoard.owner
    columns.value = kanbanBoard.columns

    kanbanBoard.columns.forEach((col) => stories.value.set(col.id, col.stories))

    const counts = kanbanBoard.columns.map((column) => column.stories.length)
    numberOfStories.value = counts.reduce((acc, val) => acc + val)

    templateStore.setFrom(templates)
  }
  function setBoardTitle(newTitle: string) {
    board.value.title = newTitle
  }
  function addColumn(title: string) {
    const id = columns.value.length + 1
    columns.value.push({ id: id, title })
    stories.value.set(id, [])
  }
  function removeColumn(idx: number) {
    columns.value.splice(idx, 1)
    stories.value.delete(idx)
  }

  function addStory(newStory: string, columnIdx: number) {
    const id = numberOfStories.value + 1
    const story: iKanbanStory = { id, title: newStory, body: templateStore.templates[0].body }
    stories.value.get(columnIdx)?.push(story)
    numberOfStories.value++
  }
  function removeStory(storyId: number, columnIdx: number) {
    const indexToRemove = stories.value.get(columnIdx)?.findIndex((story) => storyId === story.id)
    if (indexToRemove) {
      stories.value.get(columnIdx)?.splice(indexToRemove, 1)
    }
  }
  // TODO make this into a Optional
  function getStory(storyId: number, columnIdx: number) {
    return stories.value.get(columnIdx)?.find((story) => story.id === storyId)
  }
  function setStory(story: iKanbanStory, columnIdx: number) {
    stories.value.get(columnIdx)?.forEach((item, idx, arr) => {
      if (item.id === story.id) {
        arr[idx] = story
      }
    })
  }

  return {
    board,
    columns,
    stories,
    stages,
    numberOfStories,
    ready,
    selectedColumnIndex,
    selectedStoryIndex,
    selectedStory,
    setFrom,
    setBoardTitle,
    addColumn,
    removeColumn,
    addStory,
    removeStory,
    setStory,
    getStory
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBoardStore, import.meta.hot))
}
