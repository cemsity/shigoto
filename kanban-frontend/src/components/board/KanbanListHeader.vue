<script setup lang="ts">
import { ref, reactive, PropType } from "vue";
import type { Story, KanbanListStruct } from "../../types/KanbanTypes";


const props = defineProps<{
    title: string;
}>();
const emit = defineEmits<{
    (e: "addItem", newItem: string): void;
    (e: "deleteList"): void;
}>()

const newItem = ref("");

const addItem = () => {
    emit('addItem', newItem.value)
    newItem.value = "";
};
</script>

<template>
    <div class="bg-orange-50 rounded p-2">
        <button @click="$emit('deleteList')">Delete</button>
        <h3 class="text-3xl">{{ props.title }}</h3>
        <input @keyup.enter="addItem" v-model="newItem" type="text" placeholder="Add a new story" />
        <button @click="addItem">Add</button>
    </div>
</template>

<style scoped></style>
