<script setup lang="ts">
import { ref, reactive } from "vue";
import draggable from "vuedraggable";


type Story = {
  id: number;
  title: string;
};

const toDo = reactive([]);
const done = reactive([]);
const newToDo = ref("");
const newDone = ref("");
const nextId = ref(5);

const addItem = (list: Array<Story>, newItem: string) => {
  const item: Story = { id: nextId.value, title: newItem };
  list.push(item);
  nextId.value++;
  return "";
};

const deleteItem = (list: Array<Story>, index: number) => {
  list.splice(index, 1);
};

const editItem = (list: Array<Story>, index: number) => {
  list[index].title = "Changed";
};
</script>

<template>
  <div class="container mx-auto rounded-lg bg-slate-400 h-screen flex flex-nowrap justify-around">
    <div id="container_1" class="bg-orange-300 grow m-2 space-y-4 min-h-max">
      <div class="">
        <h3 class="text-3xl">Todo</h3>
        <input @keyup.enter="newToDo = addItem(toDo, newToDo)" v-model="newToDo" type="text"
          placeholder="Add a new story" />
        <button @click="newToDo = addItem(toDo, newToDo)">add</button>
      </div>
      <div class="bg-orange-100 min-h-full rounded-3xl">
        <draggable class="list-group" :list="toDo" group="stories" item-key="id">
          <template #item="{ element, index }">
            <div class="list-group-item border-2 rounded hover:bg-red-400">
              <p>{{ element.title }}</p> <button @click="editItem(toDo, index)">edit</button>
            </div>
          </template>
        </draggable>
      </div>
    </div>
    <div id="container_2" class="bg-blue-300 grow m-2 space-y-4">
      <div>
        <h3 class="text-3xl">Done</h3>
        <input @keyup.enter="newDone = addItem(done, newDone)" v-model="newDone" type="text"
          placeholder="Add a new story" />
          <button @click="newDone = addItem(toDo, newDone)">add</button>
      </div>
      <div class="bg-blue-100 rounded-3xl min-h-full">
        <draggable class="list-group space-y-2 h-full bg-red-200" :list="done" group="stories" item-key="id">
          <template #item="{ element, index }">
            <div class="list-group-item border-2 rounded hover:bg-red-400 ">
              <p>{{ element.title }}</p>
              <button @click="deleteItem(done, index)">delete</button>
            </div>
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dragging {
  opacity: 0.5;
}
</style>
