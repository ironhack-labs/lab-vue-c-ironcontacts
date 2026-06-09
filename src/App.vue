<template>
<div class="container">
  <header>
    <h1>IronContacts</h1>
    <div class="button-box">
      <button @click="addContact">Add Contact</button>
      <button @click="sortByName">Sort by Name</button>
      <button @click="sortByPopularity">Sort by Popularity</button>
    </div>
  </header>
  
  <table>
    <thead>
      <th>Picture</th>
      <th>Name</th>
      <th>Popularity</th>
      <th v-if="oscarWinnersPresent">Won<br /> Oscar</th>
      <th v-if="emmyWinnersPresent">Won <br />Emmy</th>
      <th>Actions</th>
    </thead>
    <tbody>
      <tr v-for="(contact, index) in showedContacts" :key="id">
        <td><img :src="contact.pictureUrl" height="100" /></td>
        <td>{{ contact.name }}</td>
        <td>{{ contact.popularity }}</td>
        <td v-if="oscarWinnersPresent">{{ contact.wonOscar ? "🏆" : "" }}</td>
        <td v-if="emmyWinnersPresent">{{ contact.wonEmmy ? "🏆" : "" }}</td>
        <td><button @click="deleteContact(index)">Delete</button></td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script setup>
import { computed, reactive } from "vue";

// Data
import contacts from "./contacts.json";
const showedContacts = reactive(contacts.splice(0,5));

// Computed
const oscarWinnersPresent = computed(() => showedContacts.some((contact) => contact.wonOscar));
const emmyWinnersPresent = computed(() => showedContacts.some((contact) => contact.wonEmmy));

// Methods
const addContact = (id = false) => {
  if(Number.isInteger(id)) showedContacts.push(...contacts.splice(id,1));
  else showedContacts.push(
    ...contacts.splice(
      Math.floor(Math.random() * contacts.length)
      ,1))  
};
const deleteContact = (id) => showedContacts.splice(id,1);

const sortByPopularity = () => showedContacts.sort( (a,b) => b.popularity - a.popularity );
const sortByName = () => showedContacts.sort( (a,b) => a.name.localeCompare(b.name) );
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
table {
  border: 1px solid #2c3e50;
  border-radius: 10px;
}

.button-box {
  border: 1px solid #2c3e50;
  background-color: rgb(220, 255, 254);
  border-radius: 10px;
  width: fit-content;
  padding: 10px;
}
.button-box button {
  background: #bebebe ;
  border: 1px solid #666;
  border-radius: 5px;
  margin: 5px;
  font-weight: bold;
}

header {
  width: fit-content;
  padding: 10px;
  border: 1px solid #2c3e50;
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: rgb(243, 242, 255);
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

thead th {
  border-bottom: 1px dotted #2c3e50;
}
</style>
