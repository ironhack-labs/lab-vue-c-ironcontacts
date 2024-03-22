<script setup>
import { ref, computed } from "vue";
import contacts from "@/contacts.json";

const displayContacts = ref(contacts.slice(0, 5)); 
const remainingContacts = computed(() => contacts.filter(contact => !displayContacts.value.some(fc => fc.id === contact.id)));

function addRandomContact() {
  if (remainingContacts.value.length > 0) {
    const randomIndex = Math.floor(Math.random() * remainingContacts.value.length);
    displayContacts.value.push(remainingContacts.value[randomIndex]);
  }
}

</script>

<template>
  <div id="app">
    <h1>IronContacts</h1>
    <div id="buttons"><button @click="addRandomContact">Add contact</button></div>
    <table>
      <tr>
        <th>Picture</th>
        <th>Name</th>
        <th>Popularity</th>
        <th>Won Oscar</th>
        <th>Won Emmy</th>
      </tr>
      <tr v-for="person in displayContacts" :key="person.id">
        <td class="name"><img :src="person.pictureUrl" class="person-picture"></td>
        <td>{{ person.name }}</td>
        <td>{{ person.popularity.toFixed(2) }}</td>
        <td v-if="person.wonOscar">🏆</td>
        <td v-if="!person.wonOscar"></td>
        <td v-if="person.wonEmmy">🏆</td>
        <td v-if="!person.wonEmmy"></td>
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
