<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
    title: string
}>()

const emit = defineEmits<{
    (e: "new-title", newTitle: string): void;
}>()
const newTitle = ref("")


</script>

<template>
    <div>
        <h1 class="text-5xl">{{ props.title }}</h1>
        <input v-model="newTitle" @keyup.enter='emit("new-title", newTitle)' type="text" placeholder="Change title" />
        <button @click='emit("new-title", newTitle)'>Change title</button>
    </div>
</template>

<style scoped></style>