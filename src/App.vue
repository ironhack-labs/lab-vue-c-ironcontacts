<template>
  <div id="app">
    <h1>Superstar Contact List</h1>
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
          <td><img :src="contact.pictureUrl" alt="contact.name" height="100"></td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.popularity }}</td>
          <td>{{ contact.wonOscar ? '🏆' : '' }}</td>
          <td>{{ contact.wonEmmy ? '🏆' : '' }}</td>
          <td><button @click="removeContact(contact.id)">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from 'vue';
import contactsData from './contacts.json';

export default {
  name: 'App',
  setup() {
    const contacts = ref(contactsData.slice(0, 5));

    const addRandomContact = () => {
      const remainingContacts = contactsData.filter(contact => !contacts.value.includes(contact));
      if (remainingContacts.length === 0) return;
      const randomContact = remainingContacts[Math.floor(Math.random() * remainingContacts.length)];
      contacts.value.push(randomContact);
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
    
    return { contacts, addRandomContact, sortByName, sortByPopularity, removeContact };
  },
};
</script>

<style>
#app {
  font-family: elvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 30px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  background-color: #ffffff;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #3471c2;
  color: white;
}
</style>