<script setup lang="ts">
import { ref } from 'vue'
import type { iKanbanStory, iKanbanStage } from '../../types/KanbanTypes'

const props = defineProps<{
  title: string
}>()
const emit = defineEmits<{
  (e: 'new-story', storyTitle: string): void
  (e: 'delete-list'): void
}>()

const storyTitle = ref('')

const newStory = () => {
  emit('new-story', storyTitle.value)
  storyTitle.value = ''
}
</script>

<template>
  <div class="bg-orange-50 rounded p-2">
    <button @click="$emit('delete-list')">Delete</button>
    <h3 class="text-3xl">{{ props.title }}</h3>
    <input @keyup.enter="newStory" v-model="storyTitle" type="text" placeholder="Add a new story" />
    <button @click="newStory">Add</button>
  </div>
</template>

<style scoped></style>
