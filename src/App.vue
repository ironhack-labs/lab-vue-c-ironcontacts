<script setup>
import { ref } from 'vue';
import contactsData from './contacts.json';

const contacts = ref(contactsData.slice(0, 5));
function addRandomContact() {
  // Filtrar los contactos que no están ya en la tabla
  const remainingContacts = contactsData.filter(
    contact => !contacts.value.some(c => c.id === contact.id)
  );
  if (remainingContacts.length === 0) return; // No hay más contactos para añadir

  // Seleccionar uno aleatorio
  const randomIndex = Math.floor(Math.random() * remainingContacts.length);
  const randomContact = remainingContacts[randomIndex];

  // Añadirlo a la lista
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
  contacts.value = contacts.value.filter(contact => contact.id !== id);
}
</script>
<template>
  <h1>IronContacts</h1>
  <button @click="addRandomContact">Add Random Contact</button>
    <button @click="sortByName">Sort by Name</button>
  <button @click="sortByPopularity">Sort by Popularity</button>
  <table>
    <thead>
      <tr>
        <th>Foto</th>
        <th>Nombre</th>
        <th>Popularidad</th>
        <th>Won an Oscar</th>
        <th>Won an Emmy</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="contact in contacts" :key="contact.id">
        <td>
          <img :src="contact.pictureUrl" :alt="contact.name" width="60" />
        </td>
        <td>{{ contact.name }}</td>
        <td>{{ contact.popularity.toFixed(2) }}</td>
        <td>
          <span v-if="contact.wonOscar">🏆</span>
        </td>
        <td>
          <span v-if="contact.wonEmmy">🏆</span>
        </td>
                <td>
          <button @click="deleteContact(contact.id)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style>
body {
  background: linear-gradient(135deg, #232526 0%, #414345 100%);
  min-height: 100vh;
  font-family: 'Segoe UI', 'Arial', sans-serif;
}

h1 {
  text-align: center;
  color: #ffd700;
  letter-spacing: 2px;
  text-shadow: 2px 2px 8px #222, 0 0 10px #ffd700;
  margin-top: 30px;
}

button {
  margin: 10px 5px;
  padding: 10px 22px;
  font-size: 16px;
  border-radius: 25px;
  border: none;
  background: linear-gradient(90deg, #ffd700 0%, #ffb347 100%);
  color: #232526;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  cursor: pointer;
  transition: transform 0.1s, box-shadow 0.1s;
}
button:hover {
  transform: scale(1.07);
  box-shadow: 0 4px 16px rgba(255,215,0,0.3);
}

table {
  margin: 40px auto;
  border-collapse: separate;
  border-spacing: 0;
  background: #fffbe7;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0,0,0,0.15);
  min-width: 700px;
}

th {
  background: #ffd700;
  color: #232526;
  font-size: 18px;
  padding: 14px 18px;
  border-bottom: 2px solid #ffb347;
  text-shadow: 1px 1px 2px #fffbe7;
}

td {
  padding: 12px 18px;
  text-align: center;
  font-size: 16px;
  border-bottom: 1px solid #ffe082;
}

tr:last-child td {
  border-bottom: none;
}

img {
  border-radius: 50%;
  border: 3px solid #ffd700;
  box-shadow: 0 2px 8px rgba(255,215,0,0.15);
}

span {
  font-size: 1.7em;
  filter: drop-shadow(0 0 4px #ffd700);
}

button:last-child {
  background: linear-gradient(90deg, #ff5858 0%, #ffc371 100%);
  color: #fff;
}

@media (max-width: 800px) {
  table {
    min-width: 95vw;
    font-size: 14px;
  }
  th, td {
    padding: 8px 6px;
  }
}
</style>
