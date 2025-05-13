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
          <th>Won an Oscar</th>
        <th>Won an Emmy</th>
        <th> Actions </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in contacts" :key="contact.id">
          <td><img :src="contact.pictureUrl" alt="pic" width="60" /></td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.popularity.toFixed(2) }}</td>
          <td>{{ contact.wonOscar ? "🏆" : "" }}</td>
        <td>{{ contact.wonEmmy ? "⭐" : "" }}</td>
        <td> 
          <button @click="deleteContact(contact.id)"> Delete </button>
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
  const remainingContacts = contactsData.filter(
    (contact) => !contacts.value.some((c) => c.id === contact.id)
  );

  if (remainingContacts.length === 0) return;

  const randomIndex = Math.floor(Math.random() * remainingContacts.length);
  const randomContact = remainingContacts[randomIndex];

  contacts.value.push(randomContact);
}


function sortByName() {
  contacts.value = [...contacts.value].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}


function sortByPopularity() {
  contacts.value = [...contacts.value].sort((a, b) =>
    b.popularity - a.popularity
  );
}

function deleteContact(id) {
  contacts.value = contacts.value.filter((contact) => contact.id !== id);
}
</script>

<style>
body {
  font-family: Arial, Helvetica, sans-serif;
  padding: 30px;
  color: #2C354C;
  font-size: 16px;
}
table {
  margin-top: 50px;
  border-collapse: collapse;
  width: 100%;
  background-color: ;
  
}

th, td {
  padding: 12px 15px;
  text-align: center;
  border-bottom: 1px solid #ddd;
  font-size: 1.1rem;
}

th {
  background-color: #f4f4f4;
  font-size: 1rem;
}

button {
  margin: 0 40px 0px 0;
  padding: 10px 15px;
  border: none;
  background-color: #2dc5fa;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
}
button:hover {
  background-color: #0056b3;
}

img {
  border-radius: 10px;
}
</style>
