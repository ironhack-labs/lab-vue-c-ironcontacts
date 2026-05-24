<template>
  <div class="app">
    <h1>IronContacts</h1>
    <div class="button-container">
      <button @click="addRandomContact">Add Random Contact</button>
      <button @click="sortByName">Sort by name</button>
      <button @click="sortByPopularity">Sort by popularity</button>
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
            <img :src="contact.pictureUrl" :alt="contact.name" width="80" />
          </td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.popularity }}</td>
          <td><span v-if="contact.wonOscar">🏆</span></td>
          <td><span v-if="contact.wonEmmy">🌟</span></td>
          <td>
            <button @click="deleteContact(contact.id)">Delete</button>
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
  // Collecting the IDs of all contacts currently displayed in a set for fast lookup
  const usedIds = new Set(contacts.value.map((c) => c.id));
  const remaining = contactsData.filter((c) => !usedIds.has(c.id));
  const randomContact = remaining[Math.floor(Math.random() * remaining.length)];
  contacts.value.unshift(randomContact);
}

function sortByName() {
  contacts.value.sort((contactA, contactB) =>
    contactA.name.localeCompare(contactB.name),
  );
}

function sortByPopularity() {
  contacts.value.sort(
    (contactA, contactB) => contactB.popularity - contactA.popularity,
  );
}

function deleteContact(targetId) {
  contacts.value = contacts.value.filter((contact) => contact.id !== targetId);
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap");

* {
  font-family: "Playfair Display", serif;
  font-weight: 400;
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background: linear-gradient(
    to right,
    #5a0030,
    #000000 30%,
    #000000 70%,
    #4a0050
  );
  overflow-x: hidden;
}

.app {
  min-height: 100vh;
}

h1 {
  margin: 0;
  padding-top: 1rem;
  color: rgb(220, 185, 69);
  font-size: 3rem;
  text-align: center;
}

.button-container {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}

button {
  margin-right: 0.625rem;
  font-size: 1rem;
}

table {
  border-collapse: collapse;
  margin: 1rem auto;
  color: aliceblue;
  font-size: 1.2rem;
  width: 75vw;
}

th,
td {
  border: 1px solid aliceblue;
  padding: 1rem;
  text-align: center;
  vertical-align: middle;
}

td button {
  display: inline-block;
  margin: 0 auto;
}

img {
  display: block;
}
</style>
