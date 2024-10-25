<template>
  <h1>Iron Contacts</h1>
  <button v-on:click="addRandomContact">Add random contact!</button>
  <button v-on:click="sortByName">Sort By Name!</button>
  <button v-on:click="sortByPopularity">Sort By Popularity!</button>

  <table class="contacts-list">
    <tr class="table-header">
      <th>Picture</th>
      <th>Name</th>
      <th>Popularity</th>
      <th>Won an Oscar</th>
      <th>Won an Emmy</th>
      <th>Actions</th>
    </tr>
    <tr v-for="(contact, index) in contacts" :key="index">
      <td>
        <img :src="contact.pictureUrl" alt="Celebrity picture" width="50" height="50">
      </td>
      <td>{{ contact.name }}</td>
      <td>{{ contact.popularity }}</td>
      <td>
        <span v-if="contact.wonOscar">🏆</span>
        <span v-else>No Content!</span>
      </td>
      <td>
        <span v-if="contact.wonEmmy">🏆</span>
        <span v-else>No Content!</span>
      </td>
      <td>
        <button v-on:click="deleteContact(contact.id)">Delete!</button>
      </td>
    </tr>
  </table>
</template>

<script setup>
import data from './contacts.json';
import { ref } from 'vue';

const contacts = ref(data.slice(0, 5));

const randomContact = data[5];

console.log(data);



function addRandomContact() {
  if (!contacts.value.includes(randomContact)) {
    contacts.value.push(randomContact);
  }
}

function sortByName() {
  let sortedContacts = contacts.value.slice(); 
  sortedContacts.sort(function(a, b) {
    if (a.name < b.name) {
      return -1;
    } else if (a.name > b.name) {
      return 1;
    } else {
      return 0;
    }
  });
  contacts.value = sortedContacts;
}

function sortByPopularity() {
  let sortedContacts = contacts.value.slice(); 
  sortedContacts.sort(function(a, b) {
    return b.popularity - a.popularity;
  });
  contacts.value = sortedContacts; 
}

function deleteContact(id) {
  let updatedContacts = [];
  for (let i = 0; i < contacts.value.length; i++) {
    if (contacts.value[i].id !== id) {
      updatedContacts.push(contacts.value[i]);
    }
  }
  contacts.value = updatedContacts;
}
</script>

<style scoped>
/* .table-header{
  font-size: medium;
  font-weight: 300px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  color: blueviolet;
}

table.contacts-list tr th,
table.contacts-list tr td {
  padding: 0 20px;
text-align: left;
}

h1{
  text-align: center;
  font-size: large;
  margin: 10px 30px;
}
button{
  margin: 30px 30px;

} */

h1 {
  text-align: center;
  font-size: 2rem;
  color: #333;
}

button {
  margin: 5px;
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

.contacts-list {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.contacts-list th,
.contacts-list td {
  padding: 10px;
  text-align: center;
  border: 1px solid #ddd;
}

.contacts-list th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.contacts-list tr:nth-child(even) {
  background-color: #f9f9f9;
}

.contacts-list img {
  border-radius: 50%;
}

.contacts-list button {
  padding: 5px 10px;
  font-size: 0.9rem;
  color: #fff;
  background-color: #dc3545;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.contacts-list button:hover {
  background-color: #c82333;
}
</style>
