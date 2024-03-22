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

function sortByPopularity() {
  displayContacts.value.sort((a, b) => b.popularity - a.popularity);
}

function sortByName() {
  displayContacts.value.sort((a, b) => a.name.localeCompare(b.name));
}

function deleteContact(contactId) {
  const indexToRemove = displayContacts.value.findIndex(contact => contact.id === contactId);
  if (indexToRemove !== -1) {
    displayContacts.value.splice(indexToRemove, 1);
  }
}

</script>

<template>
  <div id="app">
    <h1>IronContacts</h1>
    <div id="buttons">
      <button class="button" @click="addRandomContact">Add contact</button>
      <button class="button" @click="sortByPopularity">Sort by popularity</button>
      <button class="button" @click="sortByName">Sort by name</button>
    </div>
    <table>
      <tr>
        <th>Picture</th>
        <th>Name</th>
        <th>Popularity</th>
        <th>Won Oscar</th>
        <th>Won Emmy</th>
        <th>Actions</th>
      </tr>
      <tr v-for="person in displayContacts" :key="person.id" class="table-row">
        <td><img :src="person.pictureUrl" class="person-picture" /></td>
        <td>{{ person.name }}</td>
        <td>{{ person.popularity.toFixed(2) }}</td>
        <td>{{ person.wonOscar ? '🏆' : '' }}</td>
        <td>{{ person.wonEmmy ? '🏆' : '' }}</td>
        <td><button @click="deleteContact(person.id)" class="delete-button">Delete</button></td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button {
  padding: 10px 15px;
  margin: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: #2980b9;
}

.table-container {
  max-width: 1000px;
  margin: 20px auto;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  padding: 8px;
  text-align: left;
}

th {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background-color: #3498db;
  color: white;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

.person-picture {
  width: 50px;
}

.delete-button {
  padding: 8px 15px;
  background-color: #e74c3c;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.delete-button:hover {
  background-color: #c0392b;
}
</style>