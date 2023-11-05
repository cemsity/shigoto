<script setup lang="ts">
import { ref, onMounted } from 'vue'
import KanbanColumn from './KanbanColumn.vue'
import NewKanbanStage from "@/components/board/ui/NewKanbanStage.vue"
import {
  type iKanbanStory,
  type iKanbanStage,
  type iKanbanBoard,
  type iKanbanTemplate
} from '../../types/KanbanTypes'

import { useBoardStore } from '@/stores/board'
import { storeToRefs } from 'pinia'

const kanbanColumns: iKanbanStage[] = [
  {
    id: 1,
    title: 'Todo',
    stories: [
      {
        id: 1,
        title: 'Story 1',
        body: '# Story 1\n\nThis is a story.'
      },
      {
        id: 2,
        title: 'Story 2',
        body: '# Story 2\n\nThis is another story.'
      },
      {
        id: 3,
        title: 'Story 3',
        body: '# Story 3\n\nThis is a third story.'
      }
    ]
  },
  {
    id: 2,
    title: 'In Progress',
    stories: [
      {
        id: 4,
        title: 'Story 4',
        body: '# Story 4\n\nThis is a story that is in progress.'
      },
      {
        id: 5,
        title: 'Story 5',
        body: '# Story 5\n\nThis is another story that is in progress with a list.\n\n- List item 1\n- List item 2\n- List item 3'
      },
      {
        id: 6,
        title: 'Story 6',
        body: '# Story 6\n\nThis is a third story that is in progress with a task list.\n\n- [ ] Task 1\n- [ ] Task 2\n- [ ] Task 3'
      }
    ]
  },
  {
    id: 3,
    title: 'Done',
    stories: [
      {
        id: 7,
        title: 'Story 7',
        body: '# Story 7\n\nThis is a story that is done with a completed task list.\n\n- [x] Task 1\n- [x] Task 2\n- [x] Task 3'
      },
      {
        id: 8,
        title: 'Story 8',
        body: '# Story 8\n\nThis is another story that is done with a completed task list.\n\n- [x] Task 1\n- [x] Task 2\n- [x] Task 3.\n\n ## Notes\n\nThis is a note.'
      },
      {
        id: 9,
        title: 'Story 9',
        body: '# Story 9\n\nThis is a third story that is simple and done.'
      }
    ]
  }
]
const kanbanBoard: iKanbanBoard = {
  id: 1,
  title: 'New Kanban Board',
  owner: 'Stephen Hilson',
  columns: kanbanColumns
}
const kanbanTemplate: iKanbanTemplate = {
  id: 1,
  name: 'Default',
  body: 'This is a template that is in progress with a list.\n\n- List item 1\n- List item 2\n- List item 3'
}
const boardStore = useBoardStore()
const {
  board,
  columns,
  stories,
  stages,
  ready,
  selectedStory,
  selectedStoryIndex,
  selectedColumnIndex
} = storeToRefs(boardStore)

onMounted(() => {
  boardStore.setFrom(kanbanBoard, [kanbanTemplate])
})

const newTitle = ref('')

const changeTitle = () => {
  boardStore.setBoardTitle(newTitle.value)
  newTitle.value = ''
}

const newColumnTitle = ref('')
const newColumn = (title: string) => {
  boardStore.addColumn(title)
  return ''
}

const deleteColumn = (index: number) => {
  boardStore.removeColumn(index)
}

// Story Functions

const newStory = (storyTitle: string, columnIdx: number) => {
  boardStore.addStory(storyTitle, columnIdx)
}

const deleteStory = (storyId: number, columnIdx: number) => {
  boardStore.removeStory(storyId, columnIdx)
}

const editStoryBody = (storyBody: string, storyId: number, columnIdx: number) => {
  const story = boardStore.getStory(storyId, columnIdx)

  if (story) {
    story.body = storyBody
    boardStore.setStory(story, columnIdx)
  }
}
</script>
<template>
  <h1 class="text-5xl">{{ board.title }}</h1>
  <input v-model="newTitle" @keyup.enter="changeTitle" type="text" placeholder="Change title" />
  <button @click="changeTitle">Change title</button>
  <input
    @keyup.enter="newColumnTitle = newColumn(newColumnTitle)"
    v-model="newColumnTitle"
    type="text"
    placeholder="Add a new list"
  />
  <button @click="newColumnTitle = newColumn(newColumnTitle)">Add new list</button>
  <div class="flex flex-row space-x-4">
    <KanbanColumn
      v-for="[index, item] in stages.entries()"
      :kanbanList="item"
      :index="index"
      v-bind:key="item.id"
      @delete-list="deleteColumn(index)"
      @new-story="newStory"
      @delete-story="deleteStory"
      @edit-story-body="editStoryBody"
    />
    <NewKanbanStage/>
  </div>
</template>
<style scoped></style>
