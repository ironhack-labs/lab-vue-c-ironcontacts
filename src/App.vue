<template>
  <h1>IronContacts</h1>

  <div class="buttons-group">
    <button @click="addRandomContact">Add Random Contact</button>
    <button @click="sortByName">Sort by name</button>
    <button @click="sortByPopularity">Sort by popularity</button>
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
        <td class="image">
          <img :src="contact.pictureUrl" width="70" />
        </td>
        <td class="name">{{ contact.name }}</td>
        <td>{{ contact.popularity.toFixed(2) }}</td>
        <td>{{ contact.wonOscar ? "🏆" : "" }}</td>
        <td>{{ contact.wonEmmy ? "🌟" : "" }}</td>
        <td><button @click="deleteContact(contact.id)">Delete</button></td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref } from "vue";
import contactsData from "./contacts.json";

const contacts = ref(contactsData.slice(0, 5));

function addRandomContact() {
  const unseenContacts = contactsData.filter(
    (contact) => !contacts.value.some((el) => el.id === contact.id)
  );
  if (unseenContacts.length === 0) return;
  const randomContact =
    unseenContacts[Math.floor(Math.random() * unseenContacts.length)];
  contacts.value.push(randomContact);
}

function sortByName() {
  contacts.value.sort((a, b) => a.name.localeCompare(b.name));
}

function sortByPopularity() {
  contacts.value.sort((a, b) => b.popularity - a.popularity);
}

function deleteContact(id) {
  contacts.value = contacts.value.filter((contact) => contact.id !== id);
}
</script>

<style scoped>
h1 {
  margin-bottom: 40px;
  font-size: 3em;
  color: #8b4513;
  text-align: center;
}

.buttons-group {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 40px;
}

button {
  padding: 10px;
  background-color: #cd853f;
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #a0522d;
}

table {
  width: 90%;
  margin: 0 auto;
  border-collapse: collapse;
  max-width: 900px;
}

th,
td {
  text-align: left;
  padding: 15px 10px;
}

td {
  border-bottom: 1px solid #ccc;
}

thead {
  background-color: #fdf5e6;
  color: #8b4513;
  font-size: 1.1em;
}

.image img {
  border-radius: 5px;
}

.name {
  font-weight: bold;
}
</style>
