<template>
</template>

<script setup>
  import { ref } from 'vue';
  import contacts from '@/contacts.json'

  const contact = ref(contacts.slice(0, 5));
  console.log(contact)

</script>

<style scoped>
</style>

