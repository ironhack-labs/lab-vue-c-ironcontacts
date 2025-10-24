<template>
  <main class="container">
    <h1>IronContacts — Producer's Contacts</h1>

    <div class="controls">
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
          <th>Won an Oscar</th>
          <th>Won an Emmy</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in contacts" :key="contact.id">
          <td class="pic-cell">
            <img :src="contact.pictureUrl" :alt="contact.name" />
          </td>
          <td>{{ contact.name }}</td>
          <td>{{ formatPopularity(contact.popularity) }}</td>
          <td class="center">
            <span v-if="contact.wonOscar">🏆</span>
          </td>
          <td class="center">
            <span v-if="contact.wonEmmy">🏆</span>
          </td>
          <td>
            <button @click="removeContact(contact.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    
  </main>
</template>

<script setup>
import { ref } from "vue";
import allContacts from "./contacts.json";


const initialContacts = allContacts.slice(0, 5);
const contacts = ref([...initialContacts]);

function remainingContacts() {
  const shownIds = new Set(contacts.value.map((c) => c.id));
  return allContacts.filter((c) => !shownIds.has(c.id));
}

function addRandomContact() {
  const remaining = remainingContacts();
  if (remaining.length === 0) {
    
    return;
  }
  
  const randomIndex = Math.floor(Math.random() * remaining.length);
  const chosen = remaining[randomIndex];
 
  contacts.value = [chosen, ...contacts.value];
}


function sortByName() {
  contacts.value = [...contacts.value].sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });
}

function sortByPopularity() {
  contacts.value = [...contacts.value].sort((a, b) => b.popularity - a.popularity);
}


function removeContact(id) {
  contacts.value = contacts.value.filter((c) => c.id !== id);
}


function formatPopularity(num) {
  return Number(num).toFixed(2);
}
</script>

<style>
:root{
  --gap: 1rem;
  --max-width: 900px;
}
body, html {
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  margin: 0;
  padding: 0;
}
.container {
  max-width: var(--max-width);
  margin: 2rem auto;
  padding: 1rem;
}
h1 {
  margin-bottom: 1rem;
}
.controls {
  display: flex;
  gap: .5rem;
  margin-bottom: 1rem;
}
button {
  padding: .45rem .7rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: #f6f6f6;
  cursor: pointer;
}
button:hover { filter: brightness(.98); }

table {
  width: 100%;
  border-collapse: collapse;
}
thead th {
  text-align: left;
  padding: .5rem .75rem;
  border-bottom: 2px solid #eee;
}
tbody td {
  padding: .6rem .75rem;
  border-bottom: 1px solid #fafafa;
  vertical-align: middle;
}
.pic-cell img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
}
.center {
  text-align: center;
}
.note {
  margin-top: 1rem;
  color: #555;
}
</style>
