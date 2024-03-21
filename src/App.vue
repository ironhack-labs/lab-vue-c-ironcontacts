<script setup>
import { ref } from "vue";
import contacts from "@/contacts.json";

const fiveContacts = ref(contacts.slice(0, 5));
const sortedContacts = ref(contacts.sort((a, b) => b.popularity - a.popularity));
console.log(sortedContacts);
</script>

<template>
  <div id="app">
    <h1>IronContacts</h1>
    <table>
      <tr>
        <th>Picture</th>
        <th>Name</th>
        <th>Popularity</th>
      </tr>
      <tr v-for="person in fiveContacts" :key="person.id">
        <td><img :src="person.pictureUrl" class="person-picture"></td>
        <td>{{ person.name }}</td>
        <td>{{ person.popularity.toFixed(2) }}</td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.person-picture {
  width: 50px;
}
</style>
