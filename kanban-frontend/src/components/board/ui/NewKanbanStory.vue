<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e:"new-story", storyName: string): void;
}>()

const storyName = ref("")

const newStory = () => {
  emit('new-story', storyName.value)
  storyName.value = ""
}

</script>

<template>
<div
    class="list-group-item border-2 p-1 rounded bg-orange-50 hover:bg-red-400"
    @dblclick="newStory"
  >
    <label>Add New Story </label>
    <input type="text" v-model="storyName" @keyup.enter="newStory" />

    </div>
</template>

<style scoped></style>