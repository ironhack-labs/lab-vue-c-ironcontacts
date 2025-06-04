<template>
  <h1>IronContacts</h1>
  <button @click="addRandomContact">Add Random Contact</button>
  <button @click="sortByName">Sort by Name</button>
  <button @click="sortByPopularity">Sort by Popularity</button>

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
        <td><img :src="contact.pictureUrl" alt="pic" width="100" /></td>
        <td>{{ contact.name }}</td>
        <td>{{ contact.popularity.toFixed(2) }}</td>
        <td>{{ contact.wonOscar ? '🏆' : '' }}</td>
        <td>{{ contact.wonEmmy ? '🏆' : '' }}</td>
        <td>
          <button @click="deleteContact(contact.id)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref } from 'vue';
import contactsData from './contacts.json';

const contacts = ref(contactsData.slice(0, 5));

function addRandomContact() {
  const remainingContacts = contactsData.filter(
    (c) => !contacts.value.some((added) => added.id === c.id),
  );
  if (remainingContacts.length === 0) return;

  const randomIndex = Math.floor(Math.random() * remainingContacts.length);
  const randomContact = remainingContacts[randomIndex];
  contacts.value.push(randomContact);
}
function sortByName() {
  contacts.value.sort((a, b) => a.name.localeCompare(b.name));
}

function sortByPopularity() {
  contacts.value.sort((a, b) => b.popularity - a.popularity);
}

function deleteContact(id) {
  contacts.value = contacts.value.filter((c) => c.id !== id);
}
</script>

<style scoped>
body {
  font-family: sans-serif, Arial, Helvetica;
  background-color: #f5f7fa;
  padding: 20px;
  color: #333;
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 20px;
  color: #2c3e50;
  font-family: sans-serif, Arial, Helvetica;
}

button {
  margin: 10px 5px;
  padding: 10px 16px;
  background-color: #1abc9c;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-family: sans-serif, Arial, Helvetica;
}

button:hover {
  background-color: #16a085;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  overflow: hidden;
  font-family: sans-serif, Arial, Helvetica;
}

thead {
  background-color: #ecf0f1;
  text-transform: uppercase;
  font-size: 0.9rem;
}

th,
td {
  padding: 14px 12px;
  text-align: center;
  border-bottom: 1px solid #ecf0f1;
}

tr:hover {
  background-color: #f9f9f9;
}

img {
  border-radius: 50%;
  width: 80px;
  height: 80px;
  object-fit: cover;
  border: 2px solid #ddd;
}
</style>
