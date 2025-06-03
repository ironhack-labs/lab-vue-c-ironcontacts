<script setup>
import { ref } from 'vue';
import allContacts from '../contacts.json';

const contacts = ref(allContacts.slice(0, 5));

function addRandomContact() {
  const remainingContacts = allContacts.filter(
    (contact) => !contacts.value.some((c) => c.id === contact.id)
  );
  if (remainingContacts.length === 0) return;
  const randomContact =
    remainingContacts[Math.floor(Math.random() * remainingContacts.length)];
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

<template>
  <div>
    <div class="buttons">
      <button @click="addRandomContact">Add Random Contact</button>
      <button @click="sortByName">Sort by Name</button>
      <button @click="sortByPopularity">Sort by Popularity</button>
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
          <td><img :src="contact.pictureUrl" alt="contact.name" width="50" /></td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.popularity.toFixed(2) }}</td>
          <td>{{ contact.wonOscar ? '🏆' : '' }}</td>
          <td>{{ contact.wonEmmy ? '🏆' : '' }}</td>
          <td><button @click="deleteContact(contact.id)">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}
.buttons {
  margin-bottom: 1rem;
}
button {
  margin-right: 0.5rem;
}
</style>
