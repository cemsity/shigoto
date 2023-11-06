<script setup lang="ts">
import { marked } from 'marked'
import { computed, ref } from 'vue'
const props = defineProps<{
  markdown: string
}>()
const renderedBody = computed(() => {
  return marked.parse(`${props.markdown}`)
})
</script>

<template>
  <div class="p-2 prose">{{ renderedBody }}</div>
</template>

<style scoped></style>
