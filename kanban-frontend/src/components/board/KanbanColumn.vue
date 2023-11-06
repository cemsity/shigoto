<script setup lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable'
import type { iKanbanStory, iKanbanStage } from '../../types/KanbanTypes'
import KanbanCard from './KanbanCard.vue'
import KanbanListHeader from './KanbanListHeader.vue'
import NewKanbanStoryVue from './ui/NewKanbanStory.vue'
const props = defineProps<{
  kanbanList: iKanbanStage
  index: number
}>()
const emit = defineEmits<{
  (e: 'new-story', storyTitle: string, index: number): void
  (e: 'delete-story', storyId: number, columnIdx: number): void
  (e: 'edit-story-name', storyName: string, storyId: number, columnIdx: number): void
  (e: 'edit-story-body', storyBody: string, storyId: number, columnIdx: number): void
  (e: 'delete-list', index: number): void
  (e: 'set'): void
}>()

const stories = ref(props.kanbanList.stories)

const deleteList = () => {
  emit('delete-list', props.index)
}

const newStory = (storyTitle: string) => {
  emit('new-story', storyTitle, props.kanbanList.id)
}

const deleteStory = (storyId: number) => {
  emit('delete-story', storyId, props.kanbanList.id)
}

const editStoryBody = (storyBody: string, storyId: number) => {
  emit('edit-story-body', storyBody, storyId, props.kanbanList.id)
}
</script>

<template>
  <div
    id="container_1"
    class="bg-orange-500 grow m-2 space-y-4 min-h-max p-2 rounded-xl max-h-full max-w-[20%]"
  >
    <KanbanListHeader
      :title="props.kanbanList.title"
      @new-story="newStory"
      @delete-list="deleteList"
    />
    <div class="bg-orange-100 rounded-3xl min-h-[50%] max-h-full">
      <draggable
        class="list-group space-y-1"
        :list="props.kanbanList.stories"
        group="stories"
        item-key="id"
      >
        <template #item="{ element, index }">
          <KanbanCard
            :story="element"
            :index="index"
            @delete-story="deleteStory"
            @edit-story-body="editStoryBody"
          />
        </template>
      </draggable>
      <NewKanbanStoryVue @new-story="newStory"/>
    </div>
  </div>
</template>

<style scoped></style>
