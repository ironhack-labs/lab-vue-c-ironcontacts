<template>
  <div class="container">
    <h1>Contacts</h1>
    <button @click="addRandomContact" class="btn">Add Random Contact</button>
    <button @click="sortByName" class="btn">Sort by Name</button>
    <button @click="sortByPopularity" class="btn">Sort by Popularity</button>
    <table class="contacts-table">
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
          <td><img :src="contact.pictureUrl" alt="contact.name" width="50"></td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.popularity }}</td>
          <td>{{ contact.wonOscar ? '🏆' : '' }}</td>
          <td>{{ contact.wonEmmy ? '🏆' : '' }}</td>
          <td><button @click="removeContact(contact.id)" class="btn btn-delete">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import contactsData from './contacts.json';

const contacts = ref(contactsData.slice(0, 5));
const remainingContacts = ref(contactsData.slice(5));

const addRandomContact = () => {
  if (remainingContacts.value.length > 0) {
    const randomIndex = Math.floor(Math.random() * remainingContacts.value.length);
    contacts.value.push(remainingContacts.value.splice(randomIndex, 1)[0]);
  }
};

const sortByName = () => {
  contacts.value.sort((a, b) => a.name.localeCompare(b.name));
};

const sortByPopularity = () => {
  contacts.value.sort((a, b) => b.popularity - a.popularity);
};

const removeContact = (id) => {
  contacts.value = contacts.value.filter(contact => contact.id !== id);
};
</script>

<style>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.btn {
  margin: 5px;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3;
}

.btn-delete {
  background-color: #dc3545;
}

.btn-delete:hover {
  background-color: #c82333;
}

.contacts-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.contacts-table th,
.contacts-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.contacts-table th {
  background-color: #f2f2f2;
}
</style>
