<template>
  <div class="app">
    <h1>IronContacts</h1>

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
          <td>
            <img :src="contact.pictureUrl" :alt="contact.name" />
          </td>

          <td>{{ contact.name }}</td>

          <td>{{ contact.popularity.toFixed(2) }}</td>

          <td>
            <span v-if="contact.wonOscar">🏆</span>
          </td>

          <td>
            <span v-if="contact.wonEmmy">🏆</span>
          </td>

          <td>
            <button @click="deleteContact(contact.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from "vue";
import allContacts from "./contacts.json";

// First 5 contacts
const contacts = ref(allContacts.slice(0, 5));

// Add random contact
const addRandomContact = () => {
  const remainingContacts = allContacts.filter(
    (contact) =>
      !contacts.value.some(
        (existingContact) => existingContact.id === contact.id
      )
  );

  if (remainingContacts.length === 0) return;

  const randomIndex = Math.floor(
    Math.random() * remainingContacts.length
  );

  const randomContact = remainingContacts[randomIndex];

  contacts.value.push(randomContact);
};

// Sort by name
const sortByName = () => {
  contacts.value.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
};

// Sort by popularity
const sortByPopularity = () => {
  contacts.value.sort(
    (a, b) => b.popularity - a.popularity
  );
};

// Delete contact
const deleteContact = (contactId) => {
  contacts.value = contacts.value.filter(
    (contact) => contact.id !== contactId
  );
};
</script>

<style>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background-color: #f4f4f4;
}

.app {
  padding: 30px;
  text-align: center;
}

h1 {
  margin-bottom: 20px;
}

.buttons {
  margin-bottom: 20px;
}

button {
  margin: 0 5px;
  padding: 10px 15px;
  border: none;
  background-color: #0d6efd;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  font-weight: bold;
}

button:hover {
  background-color: #0b5ed7;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

th,
td {
  border: 1px solid #ddd;
  padding: 12px;
}

th {
  background-color: #222;
  color: white;
}

img {
  width: 60px;
  border-radius: 5px;
}
</style>