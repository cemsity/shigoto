<script setup lang="ts">
import { ref, reactive } from "vue";
import KanbanList from "./KanbanList.vue";
import type { Story, KanbanListStruct } from "../../types/KanbanTypes";


const lists = reactive([{
    id: 1,
    title: "Todo",
    stories: [{
        id: 1,
        title: "Story 1"
    },
    {
        id: 2,
        title: "Story 2"
    },
    {
        id: 3,
        title: "Story 3"
    }]
},
{
    id: 2,
    title: "In Progress",
    stories: [{
        id: 4,
        title: "Story 4"
    },
    {
        id: 5,
        title: "Story 5"
    },
    {
        id: 6,
        title: "Story 6"
    }]
},
{
    id: 3,
    title: "Done",
    stories: [{
        id: 7,
        title: "Story 7"
    },
    {
        id: 8,
        title: "Story 8"
    },
    {
        id: 9,
        title: "Story 9"
    }]
}]);

const title = ref("Kanban Board");
const newTitle = ref("");

const changeTitle = () => {
    title.value = newTitle.value;
    newTitle.value = "";
};

const nextListId = ref(4);
const newListTitle = ref("");
const addList = (title: string) => {
    lists.push({ id: nextListId.value, title: title, stories: [] });
    nextListId.value++;
    return ""
};

const deleteList = (index: number) => {
    lists.splice(index, 1);
};

</script>
<template>
    <h1 class="text-5xl">{{ title }}</h1>
    <input v-model="newTitle" @keyup.enter="changeTitle" type="text" placeholder="Change title" />
    <button @click="changeTitle">Change title</button>
    <input @keyup.enter="newListTitle = addList(newListTitle)" v-model="newListTitle" type="text" placeholder="Add a new list" />
    <button @click="newListTitle = addList(newListTitle)">Add new list</button>
    <div class="flex flex-row space-x-4">
        <KanbanList v-for="[index, item] in lists.entries()" :kanbanList="item" v-bind:key="item.id" @delete-list="deleteList(index)"/>
    </div>
</template>
<style scoped></style>
