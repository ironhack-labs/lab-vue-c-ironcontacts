<template>
    <td>
      <img :src="contact.pictureUrl" alt="contact picture">
    </td>
    <td>{{ contact.name }}</td>
    <td>{{ contact.popularity.toFixed(2) }}</td>
    <td v-if="contact.wonOscar">🏆</td>
    <td v-else></td>
    <td v-if="contact.wonEmmy">🏆</td>
    <td v-else></td>
    <td><button @click="$emit('delete')">Delete</button></td>
  </template>
  
  <script>
  export default {
    props: {
      contact: {
        type: Object,
        required: true
      }
    }
  };
  </script>
  