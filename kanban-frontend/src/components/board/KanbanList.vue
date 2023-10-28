<script setup lang="ts">
import { ref, reactive, PropType } from "vue";
import draggable from "vuedraggable";
import type { Story, KanbanListStruct } from "../../types/KanbanTypes";
import { useCounterStore } from "../../stores/counter";
import KanbanCard from "./KanbanCard.vue";
import KanbanListHeader from "./KanbanListHeader.vue";
const props = defineProps<{
    kanbanList: KanbanListStruct;
}>();
const emit = defineEmits<{
    (e: "addItem", newItem: string): void;
    (e: "deleteList"): void;
}>()

const nextId = useCounterStore();

const stories = ref(props.kanbanList.stories);


const addItem = (newItem: string) => {
    const item: Story = { id: nextId.count, title: newItem };
    stories.value.push(item);
    nextId.increment();

};

const deleteItem = (index: number) => {
    stories.value.splice(index, 1);
};

const editItem = (index: number) => {
    stories.value[index].title = "Changed";
};
</script>

<template>
    <div id="container_1" class="bg-orange-500 grow m-2 space-y-4 min-h-max p-2 rounded-xl max-h-full max-w-[20%]">
        <KanbanListHeader :title="props.kanbanList.title" @add-item="addItem" @delete-list="$emit('deleteList')" />
        <div class="bg-orange-100 rounded-3xl min-h-[50%] max-h-full">
            <draggable class="list-group space-y-1" :list="props.kanbanList.stories" group="stories" item-key="id">
                <template #item="{ element, index }">
                    <KanbanCard :element="element" :index="index" :editItem="editItem" :deleteItem="deleteItem" />
                </template>
            </draggable>
        </div>
    </div>
</template>

<style scoped></style>
