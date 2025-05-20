<template>
  <div class="container">
    <h1>IronContacts</h1>

    <div class="buttons">
  <button @click="addRandomContact">Agregar contacto aleatorio</button>
  <button @click="sortByName">Ordenar por nombre</button>
  <button @click="sortByPopularity">Ordenar por popularidad</button>
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
          <td><img :src="contact.pictureUrl" alt="contact picture" width="50" /></td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.popularity.toFixed(2) }}</td>
          <td>{{ contact.wonOscar ? '🏆' : '' }}</td>
          <td>{{ contact.wonEmmy ? '🏆' : '' }}</td>
          <td><button @click="deleteContact(contact.id)">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import contactsData from './contacts.json'


const contacts = ref(contactsData.slice(5, 10))


function addRandomContact() {
  const remainingContacts = contactsData.filter(c =>
    !contacts.value.some(shown => shown.id === c.id)
  )
  if (remainingContacts.length === 0) return
  const randomIndex = Math.floor(Math.random() * remainingContacts.length)
  const randomContact = remainingContacts[randomIndex]
  contacts.value.push(randomContact)
}


function sortByName() {
  contacts.value.sort((a, b) => a.name.localeCompare(b.name))
}


function sortByPopularity() {
  contacts.value.sort((a, b) => b.popularity - a.popularity)
}


function deleteContact(id) {
  contacts.value = contacts.value.filter(contact => contact.id !== id)
}
</script>


<style scoped>


.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  width: 100%;
  margin: auto;
}



h1 {
  margin-bottom: 20px;
  font-size: 3em;
  color: #333;
}

.buttons {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}



button {
  margin: 5px;
  padding: 10px 16px;
  background-color: #3498db;
  border: none;
  border-radius: 6px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #2980b9;
}


table {
  margin-top: 20px;
  border-collapse: collapse;
  width: 80%;
  max-width: 800px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

th, td {
  text-align: center;
  padding: 12px 8px;
  border-bottom: 1px solid #ddd;
}

thead {
  background-color: #f8f8f8;
}

img {
  border-radius: 6px;
}
</style>
