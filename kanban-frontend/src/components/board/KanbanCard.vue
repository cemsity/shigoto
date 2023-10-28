<script setup lang="ts">
    import { ref, reactive, PropType } from "vue";
    import type {Story} from "../../types/KanbanTypes";

    const props = defineProps<{
        element: Story;
        index: number;
        editItem: (index: number) => void;
        deleteItem: (index: number) => void;
    }>();

</script>

<template>
    <div class="list-group-item border-2 rounded bg-orange-50 hover:bg-red-400">
        <p>{{ element.title }}</p> 
        <button @click="editItem(index)">edit</button>
        <button @click="deleteItem(index)">delete</button>
    </div>
</template>
<style scoped></style>