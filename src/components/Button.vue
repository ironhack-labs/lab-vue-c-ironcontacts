<script setup>
const props = defineProps({
  action: {
    type: Function,
    required: false,
  },
  itemId: String,
});
</script>

<template>
  <section>
    <button @click="action?.(itemId)">
      <slot></slot>
    </button>
  </section>
</template>

<style scoped>
button {
  border-radius: 16px;
  margin: 0;
  padding: 0 7px;
  cursor: pointer;
}
</style>
