<script setup>
import { useContactsStore } from "@/stores/contactsStore";
import { storeToRefs } from "pinia";

const contactsStore = useContactsStore();

// Destructuring to avoid having to call contactsStore.function every time

const { addRandomContact, deleteContact, sortContactsByPopularity, sortContactsByName } = contactsStore
const { displayContacts } = storeToRefs(contactsStore);

// Why don't I need storesToRefs for displayContacts?

</script>

<template>
  <div id="app">
    <h1>IronContacts</h1>
    <div id="buttons">
      <button class="button" @click="addRandomContact()">Add contact</button>
      <button class="button" @click="sortContactsByPopularity()">Sort by popularity</button>
      <button class="button" @click="sortContactsByName()">Sort by name</button>
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