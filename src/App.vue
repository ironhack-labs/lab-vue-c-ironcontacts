<template>
  <div>
    <h1>IronContacts</h1>

    <button @click="addRandomContact">
      Add Random Contact
    </button>

    <button @click="sortByName">
      Sort by Name
    </button>

    <button @click="sortByPopularity">
      Sort by Popularity
    </button>

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
            <img
              :src="contact.pictureUrl"
              :alt="contact.name"
              width="80"
            />
          </td>

          <td>{{ contact.name }}</td>

          <td>{{ contact.popularity }}</td>

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

const contacts = ref(contactsData.slice(0, 5));

function addRandomContact() {
  const remainingContacts = contactsData.filter((contact) => {
    return !contacts.value.includes(contact);
  });

  const randomIndex = Math.floor(
    Math.random() * remainingContacts.length
  );

  const randomContact = remainingContacts[randomIndex];

  contacts.value.push(randomContact);
}

function sortByName() {
  contacts.value.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
}

function sortByPopularity() {
  contacts.value.sort((a, b) => {
    return b.popularity - a.popularity;
  });
}

function deleteContact(id) {
  contacts.value = contacts.value.filter((contact) => {
    return contact.id !== id;
  });
}
</script>

<style>
body {
  margin: 0;
  background-color: #f4f4f8;
  font-family: Arial, Helvetica, sans-serif;
}

div {
  padding: 20px;
}

h1 {
  text-align: center;
  color: #2c2c54;
  margin-bottom: 25px;
}

button {
  background-color: #2c2c54;
  color: white;
  border: none;
  padding: 10px 14px;
  margin: 5px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  background-color: #40407a;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
  overflow: hidden;
}

th {
  background-color: #2c2c54;
  color: white;
  padding: 14px;
  text-align: left;
}

td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
}

tr:hover {
  background-color: #f1f1ff;
}

img {
  border-radius: 8px;
  object-fit: cover;
}
</style>
