<template>
  <div>
    <h1>IronContacts</h1>
    
    <button @click="addRandomContact">Add Random Contact</button>
    <button @click="sortByName">Sort by Name</button>
    <button @click="sortByPopularity">Sort by Popularity</button>
    
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
        <tr v-for="(contact, index) in contacts" :key="contact.id">
          <td>
            <img :src="contact.pictureUrl" :alt="contact.name" width="50" />
          </td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.popularity.toFixed(2) }}</td>
          <td v-if="contact.wonOscar">🏆</td>
          <td v-else></td>
          <td v-if="contact.wonEmmy">🏅</td>
          <td v-else></td>
          
          <td>
            <button @click="removeContact(contact.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import contactsData from './contacts.json';


const contacts = ref(contactsData.slice(0, 5));

const remainingContacts = computed(() => {
  return contactsData.filter(contact => !contacts.value.includes(contact));
});

function addRandomContact() {
  if (remainingContacts.value.length > 0) {
    const randomIndex = Math.floor(Math.random() * remainingContacts.value.length);
    const randomContact = remainingContacts.value[randomIndex];
    contacts.value.push(randomContact);
  } else {
    alert("No more contacts to add!");
  }
}

function sortByName() {
  contacts.value.sort((a, b) => a.name.localeCompare(b.name));
}

function sortByPopularity() {
  contacts.value.sort((a, b) => b.popularity - a.popularity);
}

function removeContact(contactId) {
  contacts.value = contacts.value.filter(contact => contact.id !== contactId);
}
</script>

<style>
.container {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
  font-family: Arial, sans-serif;
}

h1 {
  font-family: 'Helvetica', sans-serif;
  color: #d4af37; 
  font-size: 2.5em;
  margin-bottom: 20px;
}

.button-group button {
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  margin: 0 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button-group button:hover {
  background-color: #d4af37;
}

table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

th, td {
  padding: 15px;
  border-bottom: 1px solid #ddd;
  font-size: 1em;
}

th {
  background-color: #333;
  color: #fff;
  text-transform: uppercase;
}

tbody tr:hover {
  background-color: #f1f1f1;
}

.contact-image {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.delete-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.3s;
}

.delete-button:hover {
  background-color: #c0392b;
}

td {
  font-size: 1.2em;
  text-align: center;
}
</style>
