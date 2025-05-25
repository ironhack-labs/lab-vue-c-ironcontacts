// src/App.vue
<template>
  <h1>IronContacts</h1>
  <div class="button-group">
    <button @click="addRandomContact">Add Random contact</button>
    <button @click="sortByName">Sort by name</button>
    <button @click="sortByPopularity">Sort by popularity</button>
  </div>
  <table>
    <thead>
      <tr>
        <th>Picture</th>
        <th>Name</th>
        <th>Popularity</th>
        <th>Won an Oscar</th>
        <th>Won an Emmy</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="contact in contacts" :key="contact.id">
        <td>
          <img :src="contact.pictureUrl" :alt="contact.name" width="60" />
        </td>
        <td>{{ contact.name }}</td>
        <td>{{ contact.popularity.toFixed(2) }}</td>
        <td>
          <span v-if="contact.wonOscar">🏆</span>
        </td>
        <td>
          <span v-if="contact.wonEmmy">🌟</span>
        </td>
        <td>
          <button @click="deleteContact(contact.id)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref } from "vue";
import contactsData from "./contacts.json";

const contacts = ref(contactsData.slice(0, 5));

function addRandomContact() {
  // Filter contacts that are not already in the list
  const remainingContacts = contactsData.filter(
    contact => !contacts.value.some(c => c.id === contact.id)
  );
  if (remainingContacts.length === 0) return; // No more contacts to add

  // Select one at random
  const randomIndex = Math.floor(Math.random() * remainingContacts.length);
  const randomContact = remainingContacts[randomIndex];

  // Add it to the list
  contacts.value.push(randomContact);
}

function sortByName() {
  contacts.value = [...contacts.value].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}

function sortByPopularity() {
  contacts.value = [...contacts.value].sort((a, b) =>
    b.popularity - a.popularity
  );
}

function deleteContact(id) {
  contacts.value = contacts.value.filter(contact => contact.id !== id);
}
</script>

<style>
body {
  background: linear-gradient(135deg, #232526 0%, #414345 100%);
  font-family: 'Segoe UI', 'Arial', sans-serif;
  color: #fff;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}

h1 {
  text-align: center;
  margin-top: 32px;
  font-size: 3rem;
  letter-spacing: 2px;
  color: #ffd700;
  text-shadow: 2px 2px 8px #000;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
  margin-bottom: 8px;
}

table {
  border-collapse: collapse;
  width: 90%;
  margin: 32px auto;
  background: rgba(30, 30, 30, 0.95);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 16px;
  overflow: hidden;
}

th, td {
  border: 1px solid #444;
  padding: 16px;
  text-align: center;
  font-size: 1.1rem;
}

th {
  background: #ffd700;
  color: #232526;
  font-weight: bold;
  letter-spacing: 1px;
}

tbody tr:nth-child(even) {
  background: rgba(255, 255, 255, 0.05);
}

tbody tr:hover {
  background: rgba(255, 215, 0, 0.15);
  transition: background 0.2s;
}

img {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

button {
  background: linear-gradient(90deg, #ffd700 0%, #ffb300 100%);
  color: #232526;
  border: none;
  border-radius: 8px;
  margin-bottom: 16px;
  margin-right: 8px;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  transition: background 0.2s, color 0.2s, transform 0.1s;
}

button:hover {
  background: linear-gradient(90deg, #ffb300 0%, #ffd700 100%);
  color: #232526;
  transform: scale(1.05);
}

span {
  font-size: 1.5rem;
  filter: drop-shadow(0 0 4px #ffd700);
}
</style>

