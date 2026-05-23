<template>
  <div class="app">
    <h1>🎬 IronContacts</h1>

    <div class="buttons">
      <button @click="addRandomContact">
        Add Random Contact
      </button>

      <button @click="sortByName">
        Sort by Name
      </button>

      <button @click="sortByPopularity">
        Sort by Popularity
      </button>
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
            <img
              :src="contact.pictureUrl"
              :alt="contact.name"
            />
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
            <button
              class="delete-btn"
              @click="deleteContact(contact.id)"
            >
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

// primeros 5 contactos
const contacts = ref(contactsData.slice(0, 5));


// ADD RANDOM CONTACT
const addRandomContact = () => {

  const remainingContacts = contactsData.filter((contact) => {
    return !contacts.value.some(
      (currentContact) => currentContact.id === contact.id
    );
  });

  const randomIndex = Math.floor(
    Math.random() * remainingContacts.length
  );

  const randomContact = remainingContacts[randomIndex];

  contacts.value.push(randomContact);
};


// SORT BY NAME
const sortByName = () => {

  contacts.value.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

};


// SORT BY POPULARITY
const sortByPopularity = () => {

  contacts.value.sort((a, b) => {
    return b.popularity - a.popularity;
  });

};


// DELETE CONTACT
const deleteContact = (contactId) => {

  contacts.value = contacts.value.filter((contact) => {
    return contact.id !== contactId;
  });

};
</script>

<style>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background-color: #141414;
  color: white;
}

.app {
  max-width: 1100px;
  margin: 40px auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 3rem;
  color: #ffd700;
}

.buttons {
  display: flex;
  gap: 12px;
  margin-bottom: 25px;
  justify-content: center;
  flex-wrap: wrap;
}

button {
  background-color: #e50914;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.2s;
}

button:hover {
  transform: scale(1.05);
  opacity: 0.9;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #222;
  overflow: hidden;
  border-radius: 12px;
}

thead {
  background-color: #333;
}

th,
td {
  padding: 16px;
  text-align: center;
  border-bottom: 1px solid #444;
}

tr:hover {
  background-color: #2e2e2e;
}

img {
  width: 80px;
  border-radius: 10px;
}

.delete-btn {
  background-color: #555;
}

.delete-btn:hover {
  background-color: #777;
}
</style>