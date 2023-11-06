<script setup lang="ts">
import { ref } from 'vue'
import type { iKanbanStory, iKanbanStage } from '../../types/KanbanTypes'

const props = defineProps<{
  title: string
}>()
const emit = defineEmits<{
  (e: 'delete-list'): void
}>()

const storyTitle = ref('')

</script>

<template>
  <div class="bg-orange-50 rounded p-2">
    <button @click="$emit('delete-list')">Delete</button>
    <h3 class="text-3xl">{{ props.title }}</h3>
  </div>
</template>

<style scoped></style>
