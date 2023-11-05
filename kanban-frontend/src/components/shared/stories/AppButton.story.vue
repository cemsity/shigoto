<script setup lang="ts">
import AppButton from '../AppButton.vue'

function initState() {
  return {
    disabled: false,
    color: undefined,
    size: undefined
  }
}
</script>

<template>
  <Story title="AppButton">
    <AppButton>Button</AppButton>
  </Story>
</template>
