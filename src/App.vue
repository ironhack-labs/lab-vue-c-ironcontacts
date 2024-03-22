<template>
  <table>
    <thead>
      <tr>
        <th>Picture</th>
        <th>Name</th>
        <th>Popularity</th>
        <th>Won Oscar</th>
        <th>Won Emmy</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(con, index) in contact" :key="index">
        <td><img :src="con.pictureUrl" :alt="con.name"></td>
        <td>{{ con.name }}</td>
        <td>{{ con.popularity }}</td>
        <td v-if="con.wonOscar === true">🏆</td>
        <td v-if="con.wonEmmy === true">🏆</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
  import { ref } from 'vue';
  import contacts from '@/contacts.json'

  const contact = ref(contacts.slice(5, 10));

</script>

<style scoped>
  img {
    max-height: 100px;
  }
</style>

