<script setup>
import { ref } from "vue";
import contacts from "./contacts.json";

const addedContacts = ref(contacts.slice(0, 5));

function addRandomContact() {
  const remainingContacts = contacts.filter(
    (contact) => !addedContacts.value.some((addedContact) => addedContact.id === contact.id)
  );
  
  if (remainingContacts.length > 0) {
    const randomIndex = Math.floor(Math.random() * remainingContacts.length);
    addedContacts.value.push(remainingContacts[randomIndex]);
  }
}

function sortBy(key) {
  addedContacts.value.sort((a, b) => a[key] > b[key] ? 1 : -1);
}

function removeContact(id) {
  const index = addedContacts.value.findIndex((contact) => contact.id === id);
  if (index !== -1) {
    addedContacts.value.splice(index, 1);
  }
}
</script>


<template>
  <div class="app">
    <h1>IronContacts</h1>
    <table>
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won an Oscar</th>
          <th>Won an Emmy</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in addedContacts" :key="contact.id">
          <td><img :src="contact.pictureUrl" alt="contact" width="50" /></td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.popularity }}</td>
          <td v-if="contact.wonOscar">🏆</td>
          <td v-else></td>
          <td v-if="contact.wonEmmy">🏆</td>
          <td v-else></td>
          <td><button @click="removeContact(contact.id)">Delete</button></td>
        </tr>
      </tbody>
    </table>
    <div class="button">
      <button @click="addRandomContact()">Add Random Contact</button>
    <button @click="sortBy('name')">Sort by Name</button>
    <button @click="sortBy('popularity')">Sort by Popularity</button>
    </div>
  </div>
</template>

<style scoped>
  h1 {
    text-align: center;
  }

  table {
    border-collapse: collapse;
    margin: auto;
  }

  td,th {
    border: 1px solid grey;
    padding: 10px;
    text-align: center;
  }

  image {
    border-radius: 50%;
  }

  .button {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 50px;
    gap: 20px;
  }
</style>
