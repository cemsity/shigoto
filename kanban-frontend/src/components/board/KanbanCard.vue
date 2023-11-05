<script setup lang="ts">
import { ref } from 'vue'
import type { iKanbanStory } from '../../types/KanbanTypes'
import KanbanCardDisplay from './KanbanCardDisplay.vue'
// import { useStoryStore } from "@/stores/story";
const props = defineProps<{
  element: iKanbanStory
  index: number
}>()
const emit = defineEmits<{
  (e: 'new-story', storyTitle: string, index: number): void
  (e: 'delete-story', storyId: number): void
  (e: 'edit-story-name', storyName: string, storyIdx: number): void
  (e: 'edit-story-body', storyBody: string, storyIdx: number): void
  (e: 'delete-list', index: number): void
  (e: 'set'): void
}>()
const show = ref(false)

const deleteStory = (storyId: number) => {
  emit('delete-story', storyId)
}
const toggleCard = () => {
  show.value = !show.value
}
const editStoryBody = (storyBody: string, storyId: number) => {
  emit('edit-story-body', storyBody, storyId)
}
</script>

<template>
  <div
    class="list-group-item border-2 p-1 rounded bg-orange-50 hover:bg-red-400"
    @dblclick="toggleCard"
  >
    <p>{{ props.element.title }}</p>
    <button @click="toggleCard">edit</button>
    <button @click="deleteStory(props.element.id)">delete</button>
    <Teleport v-if="show" to="body">
      <KanbanCardDisplay
        :story="props.element"
        @close="toggleCard"
        @edit-story-body="editStoryBody"
      />
    </Teleport>
  </div>
</template>
<style scoped></style>
