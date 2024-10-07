<script setup>
import { ref } from "vue";

const contactsList = ref([]);
const contacts = ref([]);
let randomNumber = 0;
let indexToRemove = 0;

async function obtainContacts() {
  try {
    const response = await fetch("/src/contacts.json");
    if (!response.ok) throw new Error("Error al obtener los datos");
    const jsonResponse = await response.json();
    contactsList.value = jsonResponse;

    for (let i = 0; i < 5; i++) {
      contacts.value.push(contactsList.value[i]);
    }

    for (let i = 4; i >= 0; i--) {
      extractContact(i);
      //usando unshift
      //usando splice/
    }

  } catch (err) {
    console.error("Something went wrong!", err);
  }
}
obtainContacts();

function addRandomContact() {
  if (!contactsList.value.length) return;
  randomNumber = Math.floor(Math.random() * contactsList.value.length);
  contacts.value.push(contactsList.value[randomNumber]);
  extractContact(randomNumber);
}

function extractContact(numContacts) {
  let indexToRemove = numContacts;
  contactsList.value.splice(indexToRemove, 1);
}

function sortPopularity(numContacts) {
  contacts.value.sort((a, b) => b.popularity - a.popularity);
}

function sortByName(numContacts) {
  contacts.value.sort((a, b) => a.name.localeCompare(b.name));
}

function removeContact(randomNumber) {
  indexToRemove = randomNumber - 1;
  contacts.value.splice(indexToRemove, 1);
}
</script>

<template>
  <head>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
    />
  </head>
  <section class="contanier-contacts">
    <h1>IronContacts</h1>
    <div class="buttons-inicial">
      <button @click="addRandomContact">Add random contact</button>
      <button @click="sortPopularity">Sort popularity</button>
      <button @click="sortByName">Sort by name</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won Oscar</th>
          <th>Won Emmy</th>
          <th>Acctions</th>
        </tr>
      </thead>
      <tbody v-for="(contact, index) in contacts" :key="index">
        <tr>
          <td><img :src="contact.pictureUrl" :alt="contact.name" /></td>
          <td>{{ contact.name }}</td>
          <td v-if="contact.popularity">{{ contact.popularity.toFixed(2) }}</td>
          <td v-if="contact.wonEmmy">⭐</td>
          <td v-else></td>
          <td v-if="contact.wonOscar">🏆</td>
          <td v-else></td>
          <td>
            <button @click="removeContact">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style>
.container-contacts {
  max-width: 900px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  text-align: center;
  font-family: "Arial", sans-serif;
  color: #333;
  margin-bottom: 20px;
}

button {
  background-color: #f0f0f0;
  border: none;
  color: black;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid black;
  cursor: pointer;
  transition: background-color 0.3s ease;
  cursor: pointer; 
  font-size: 16px;
  font-weight: bold;
}

.buttons-inicial {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

button:hover {
  background-color: #0056b3;
}

h1 {
  font-size: 40px;
}

table {
  margin: 0 auto;
  width: 50%;
  border-collapse: collapse;
  margin-top: 20px;
}

thead th {
  color: black;
  padding: 10px;
  font-weight: bold;
  font-size: 20px;
}

tbody td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: center;
}

td img {
  width: 60px;
  height: auto;
  border-radius: 10%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

td {
  font-size: 24px;
}

td button {
  background-color: #dc3545;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  color: white;
}

.buttons-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

td button:hover {
  background-color: #c82333;
}

@media (max-width: 768px) {
  .container-contacts {
    padding: 10px;
  }

  table {
    font-size: 14px;
  }

  td img {
    width: 40px;
  }

  td button {
    padding: 5px 8px;
    font-size: 12px;
  }
}
</style>
