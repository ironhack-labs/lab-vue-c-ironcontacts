<!-- src/App.vue -->
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
import contactsData from "./contacts.json";

// First 5 contacts
const contacts = ref(contactsData.slice(0, 5));

// Add random contact
const addRandomContact = () => {
  // Contacts not already displayed
  const remainingContacts = contactsData.filter(
    (contact) =>
      !contacts.value.some(
        (existingContact) => existingContact.id === contact.id
      )
  );

  // Prevent errors if all contacts are added
  if (remainingContacts.length === 0) return;

  const randomIndex = Math.floor(
    Math.random() * remainingContacts.length
  );

  const randomContact = remainingContacts[randomIndex];

  contacts.value.push(randomContact);
};

// Sort alphabetically
const sortByName = () => {
  contacts.value = [...contacts.value].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
};

// Sort by popularity descending
const sortByPopularity = () => {
  contacts.value = [...contacts.value].sort(
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
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
  background-color: #f4f4f4;
}

.app {
  padding: 30px;
}

h1 {
  margin-bottom: 20px;
}

.buttons {
  margin-bottom: 20px;
}

button {
  margin-right: 10px;
  padding: 8px 14px;
  border: none;
  background-color: #1890ff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #096dd9;
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
  text-align: center;
}

th {
  background-color: #001529;
  color: white;
}

img {
  width: 60px;
  border-radius: 6px;
}
</style>