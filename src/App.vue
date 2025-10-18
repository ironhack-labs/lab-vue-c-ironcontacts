<template>
<main>
  <h1>Ironcontacts</h1>
  
  <button @click="addRandomcontact">Add Random Contact</button>
  <button @click="SortByPopularity">Sort by Popularity</button>
  <button @click="SortByName">Sort by Name</button>

    
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
      <td><img :src="contact.pictureUrl" :alt="`Photo of ${contact.name}`" width="80" /></td>             
      <td>{{ contact.name }}</td>
      <td> {{ contact.popularity }}</td>
      <td><span v-if="contact.wonOscar">🏆</span></td>
      <td><span v-if="contact.wonEmmy">🏆</span></td> 
      <td><button @click="deleteContact(contact.id)">Delete</button></td> 
    </tr>
    </tbody>
    </table>
  </main>

</template>

<script setup>
import { ref } from 'vue';
import contactsData from './contacts.json'

const contacts = ref(contactsData.slice(0, 6))

function addRandomcontact() {
      const remainingContacts = contactsData.filter(
        c => !contacts.value.includes(c)
      );
      if (remainingContacts.length > 0) {
        const randomIndex = Math.floor(Math.random() * remainingContacts.length);
        const randomContact = remainingContacts[randomIndex];

        contacts.value.push(randomContact);
        } else {
          alert("No more contacts to add");
        }
      }
    
function SortByPopularity () {
  contacts.value.sort((a, b) => b.popularity - a.popularity);
}

function SortByName() {
  contacts.value.sort((a, b) => a.name.localeCompare(b.name));
}

function deleteContact(id) {
  contacts.value = contacts.value.filter(contact => contact.id !== id);
}

</script>

<style>
td {
  text-align: center;
  padding: 10px;
}

button {
  display: block;
  margin: 20px auto
  }

  tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}
button:hover {
  opacity: 0.9;
  transform: scale(1.05);
  border-radius: 5px.
}
tr {
  transition: all 0.3s ease-in-out;
}
</style>