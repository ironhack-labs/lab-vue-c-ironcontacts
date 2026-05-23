<template>
  <div class="app">
    <h1>IronContacts</h1>

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
            />
          </td>

          <td>{{ contact.name }}</td>

          <td>
            {{ contact.popularity.toFixed(2) }}
          </td>

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


const addRandomContact = () => {
  
  const remainingContacts = contactsData.filter((contact) => {
    return !contacts.value.some(
      (currentContact) => currentContact.id === contact.id
    );
  });

  
  if (remainingContacts.length === 0) {
    return;
  }

  // random contact
  const randomIndex = Math.floor(
    Math.random() * remainingContacts.length
  );

  const randomContact = remainingContacts[randomIndex];

  // add to contacts
  contacts.value.push(randomContact);
};

// sort name
const sortByName = () => {
  contacts.value.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
};

// sort popularity
const sortByPopularity = () => {
  contacts.value.sort((a, b) => {
    return b.popularity - a.popularity;
  });
};

// Delete Contact
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
  background-color: #111827;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  opacity: 0.9;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
}

th,
td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
}

th {
  background-color: #111827;
  color: white;
}

img {
  width: 60px;
  border-radius: 6px;
}
</style>