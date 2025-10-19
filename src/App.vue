<script setup>
import contacts from './contacts.json';
import { ref } from 'vue';

const contactsD = ref(contacts.slice(10, 15));

//Funcion para agregar contactos
function addRandomContact() {
  const currentIds = contactsD.value.map(c => c.id)
  const remainingContacts = contacts.filter(c => !currentIds.includes(c.id))
  if (remainingContacts.length === 0) {
    alert("No more contacts to add!")
    return
  }
  const randomIndex = Math.floor(Math.random() * remainingContacts.length)
  const newContact = remainingContacts[randomIndex]
  contactsD.value.push(newContact)
}

//Funcion para ordenar por nbombre
function selectByName() {
  contactsD.value.sort((a, b) => a.name.localeCompare(b.name))
}

//Funcion por popularidad
function sortByPopularity() {
  contactsD.value.sort((a, b) => b.popularity - a.popularity)
}

//funcion para borrar cont
function removeContact(id) {
  contactsD.value = contactsD.value.filter(contact => contact.id !== id)
}
</script>

<template>
  <div>
  <h1>IronContacs</h1>
  <button class="btn" @click="addRandomContact">Random Contact</button>
  <button class="btn" @click="sortByPopularity">Sort By Popularity</button>
  <button class="btn" @click="selectByName">Sort By Name</button>

<table>
  <thead>
    <tr>
    <th class="text-head">Picture</th>
   <th class="text-head">Name</th>
   <th class="text-head">Popularity</th>
   <th class="text-head">Won Oscar</th>
   <th class="text-head">Won Emmy</th>
   <th class="text-head">Actions</th>

   </tr>
  </thead>
  <tbody>
    <tr v-for="contacts in contactsD" :key="contacts.id">
      <img :src="contacts.pictureUrl" :alt="contacts.name" width="100" />
      <td class="td-c">{{ contacts.name }}</td>
      <td class="td-c">{{ contacts.popularity.toFixed(2) }}</td>
      <td>
        <span v-if="contacts.wonOscar" class="award-icon">🏆</span>
      </td>
            <td>
        <span v-if="contacts.wonEmmy" class="award-icon">🥇</span>
      </td>
      <td>
        <button class="delete-btn" @click="removeContact(contacts.id)">Delete</button>
      </td>
    </tr>
  </tbody>
</table>
    </div>

</template>

<style>
body {
  font-family: 'Raleway', sans-serif;
  background-color: #f9f9f9;
  padding: 20px;
  color: #333;
}
h1 {
  font-size: 2rem;
  color: #387BB5;
  margin-bottom: 20px;
}
.text-head{
  font-size: 1.5rem;
  padding: 1%;
}
/*Tabla*/
table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  overflow: hidden;
}

th, td {
  padding: 16px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background-color: #135f7f;
  color: white;
  font-size: 1.1rem;
}
.td-c{
  padding-left: 5%;
}
td {
  vertical-align: middle;
  padding: 10px 0;
}
.btn {
  padding: 10px 20px;
  margin: 1%;
  font-weight: bold;
  background-color: #135f7f;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.btn:hover {
  background-color: #1a7fa5;
  transform: scale(1.05);
}

.btn:active {
  transform: scale(0.95);
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}
.delete-btn {
  background-color: #c0392b;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s ease;
}

.delete-btn:hover {
  background-color: #e74c3c;
}
img {
  border-radius: 8px;
  max-height: 100px;
  object-fit: cover;
}
.award-icon {
  font-size: 1.5rem;
  transition: transform 0.2s;
}
.award-icon:hover {
  transform: scale(1.3);
}

@media (max-width: 600px) {
  table, thead, tbody, th, td, tr {
    display: block;
  }

  td {
    padding: 10px;
    border: none;
    border-bottom: 1px solid #ccc;
  }

  th {
    display: none;
  }
}

</style>
