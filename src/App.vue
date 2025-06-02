<template>
  <div id="app">
    <h1>IronContacts</h1>

    <div class="buttons">
      <button @click="addRandomContact">Add Random Contact</button>
      <button @click="sortByPopularity">Sort by popularity</button>
      <button @click="sortByName">Sort by name</button>
    </div>

    <table>
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won Oscar</th>
          <th>Won Emmy</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in contacts" :key="contact.id">
          <td><img :src="contact.pictureUrl" alt="actor image" class="avatar" /></td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.popularity.toFixed(2) }}</td>
          <td>{{ contact.wonOscar ? '🏆' : '' }}</td>
          <td>{{ contact.wonEmmy ? '✨' : '' }}</td>
          <td><button @click="deleteContact(contact.id)">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import contactsData from './contacts.json';

const allContacts = [...contactsData];
const contacts = ref(allContacts.slice(0, 5));

function addRandomContact() {
  const remainingContacts = allContacts.filter(
    contact => !contacts.value.some(c => c.id === contact.id)
  );
  if (remainingContacts.length === 0) return;
  const randomContact =
    remainingContacts[Math.floor(Math.random() * remainingContacts.length)];
  contacts.value.push(randomContact);
}

function sortByPopularity() {
  contacts.value.sort((a, b) => b.popularity - a.popularity);
}

function sortByName() {
  contacts.value.sort((a, b) => a.name.localeCompare(b.name));
}

function deleteContact(id) {
  contacts.value = contacts.value.filter(contact => contact.id !== id);
}
</script>

<style>
#app {
  max-width: 800px;
  margin: 0 auto;
  font-family: 'Arial', sans-serif;
  text-align: center;
}

h1 {
  margin-bottom: 20px;
}

.buttons button {
  margin: 0 5px 20px;
  padding: 8px 12px;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;
  border-radius: 4px;
}

.buttons button:hover {
  background-color: #f0f0f0;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

th {
  background-color: #f9f9f9;
}

.avatar {
  width: 60px;
  height: auto;
  border-radius: 8px;
}
</style>
