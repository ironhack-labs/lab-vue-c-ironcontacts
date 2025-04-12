// src/App.vue
<template>
  <div id="app">
    <h1>IronContacts</h1>
    <div class="buttons">
      <button @click="addRandomContact">Add Random Contact</button>
      <button @click="sortByPopularity">Sort by Popularity</button>
      <button @click="sortByName">Sort by Name</button>
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
        <tr v-for="(contact, index) in contactsList" :key="index">
          <td><img :src="contact.pictureUrl" alt="Contact Picture" /></td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.popularity.toFixed(2) }}</td>
          <td>{{ contact.wonOscar ? '🏆' : ' ' }}</td>
          <td>{{ contact.wonEmmy ? '🏆' : ' ' }}</td>
          <td><button @click="removeContact(index)">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import contacts from "./contacts.json";
import { ref } from "vue";
//just the 5 firsts contacts
const contactsList = ref(contacts.slice(0,5));
//random contacts
const randomContact = () => {
  const randomIndex = Math.floor(Math.random() * contacts.length);
  return contacts[randomIndex];
};
//add random contact
const addRandomContact = () => {
  const newContact = randomContact();
  // Check if the contact is already in the list
  if (!contactsList.value.some(contact => contact.id === newContact.id)) {
    contactsList.value.push(newContact);
  } else {
    addRandomContact(); 
  }
};

//sort by popolarity
const sortByPopularity = () => {
  contactsList.value.sort((a, b) => b.popularity - a.popularity);
};
//sort by name  
const sortByName = () => {
  contactsList.value.sort((a, b) => a.name.localeCompare(b.name));
};
//remove contact
const removeContact = (index) => {
  contactsList.value.splice(index, 1);
};

</script>

<style>
#app {
  font-family: 'Arial', sans-serif;
  padding: 3% 3%;
  margin: 0 auto;
  font-size: 1rem;
}
h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 4rem;
}
.buttons {
  display: flex;
  justify-content: center;
  gap: 1%;
  margin-bottom: 20px;
}
button {

  margin: 0 auto;
  padding: 5px 5px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 10px;
  text-align: center;
  
}

img {
  width: 70px;
  height: 100px;
  
}
</style>