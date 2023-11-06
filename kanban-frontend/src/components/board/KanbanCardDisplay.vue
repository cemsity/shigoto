<script setup lang="ts">
import { marked } from 'marked'
import { computed, ref } from 'vue'
import { vOnClickOutside } from '@vueuse/components'
import type { iKanbanStory } from '@/types/KanbanTypes'

const props = defineProps<{
  story: iKanbanStory
}>()
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'edit-story-body', storyBody: string, storyId: number): void
}>()

const body = ref(props.story.body)
const editedBody = ref('')
const editing = ref(false)
const renderedBody = computed(() => {
  return marked(`# ${props.story.title}\n${body.value}`)
})
const display = ref(false)

let bodyCache = ''
function editBody() {
  editing.value = !editing.value
  bodyCache = body.value
  editedBody.value = body.value
}

const doneEdit = () => {
  editing.value = !editing.value
  //   body.value = editedBody.value
  emit('edit-story-body', body.value, props.story.id)
  bodyCache = ''
  editedBody.value = bodyCache
}

const cancelEdit = () => {
  editing.value = !editing.value
  body.value = bodyCache

  bodyCache = ''
}
const save = () => {
  doneEdit()
}
const close = () => {
  emit('close')
}
</script>

<template>
  <div class="grid h-screen place-items-center">
    <div
      @dblclick="editBody"
      class="bg-orange-100 rounded-3xl min-h-[50%] min-w-[50%] modal flex flex-row"
      v-on-click-outside="close"
    >
      <div v-if="editing" class="h-100">
        <textarea
          class="flex-1 m-1 rounded-md p-2 bg-orange-50 font-mono"
          v-model="body"
          @keyup.ctrl.enter="doneEdit"
          @keyup.escape="cancelEdit"
        />
        <div class="flex flex-row object-right">
          <button @click="save">save</button>
          <button @click="cancelEdit">Cancel</button>
        </div>
      </div>
      <div class="flex-1">
        <button @click="close">Close</button>
        <div class="p-2 prose" v-html="renderedBody"></div>
        <!-- <div class="p-2"></div> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
}
</style>
