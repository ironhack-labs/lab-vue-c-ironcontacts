// src/App.vue
<template>
  <button @click="addRContact">
    Add Random Contact
  </button>
  <button @click="sortByName">Sort By Name</button>
  <button @click="sortByPopularity">Sort By Popularity</button>
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
      <tr v-for="(con, index) in contacts_table" :key="index">
        <td><img :src="con.pictureUrl" :alt="con.name"></td>
        <td>{{ con.name }}</td>
        <td>{{ con.popularity }}</td>
        <td v-if="con.wonOscar === true">🏆</td>
        <td v-else> </td>
        <td v-if="con.wonEmmy === true">🌟</td>
        <td v-else> </td>
        <td><button @click="() => DeleteContact(index)">Delete</button></td>
      </tr>
    </tbody>
  </table>

</template>

<script setup>
import { ref } from "vue";

import contacts from "./contacts.json";

const contacts_table = ref(contacts.slice(0, 5));
console.log(contacts_table);

const addRContact = () => {

  
  if (contacts_table.value.length > 0) {
    const contactsNotTable = contacts.filter(con => !contacts_table.value.includes(con));
    const newContact = contactsNotTable[Math.floor(Math.random() * contactsNotTable.length)];
    contacts_table.value.push(newContact)
    }
    else {
      alert('No more contacts to show. All of them are already displayed')
    }
 
}

const sortByName = () => {
  contacts_table.value.sort((a,b) => a.name.localeCompare(b.name));
}

const sortByPopularity = () => {
  contacts_table.value.sort((a,b) => a.popularity - b.popularity);
}

const DeleteContact = (index) => {
  contacts_table.value.splice(index,1)
}

</script>

<style scoped>


  img {
    width: 70px;
    height: auto;
  }

</style>
