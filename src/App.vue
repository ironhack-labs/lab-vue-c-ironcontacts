<script setup>
import contacts from "./contacts.json"
import { ref } from 'vue'; // Import the ref function from Vue

const contactsList = ref(contacts.slice(0, 5)); // Slice the first 5 contacts
const addRandomContact = () => {
  const remainingContacts = contacts.filter(contact => !contactsList.value.includes(contact));
  if (remainingContacts.length > 0) {
    const randomIndex = Math.floor(Math.random() * remainingContacts.length);
    const randomContact = remainingContacts[randomIndex];
    contactsList.value.push(randomContact);
  } else {
    console.log("All contacts have been displayed");
  }
};
const sortByPopularity = () => {
  contactsList.value.sort((a, b) => b.popularity - a.popularity);
}
const sortByName = () => {
  contactsList.value.sort((a, b) => a.name.localeCompare(b.name));
};
const removeContact = (id) => {
  const index = contactsList.value.findIndex((contact) => contact.id === id);
  if (index !== -1) {
    contactsList.value.splice(index, 1);
    contactsList.value = [...contactsList.value]; // Update the ref to trigger reactivity
  }
};
</script>

<template>
  <div class="style">
    <h1>Contacts</h1>
    <div class="btn-style">
     <button @click="addRandomContact" >Add Random Contact</button>
     <button @click="sortByPopularity" >Sort By Popularity</button>
     <button @click="sortByName" >Sort By Name</button>
    </div>
    <table class="table-style">
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>WonOscar</th>
          <th>WonEmmy</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in contactsList" :key="contact.id">
          <td>
            <img :src="contact.pictureUrl" alt="Contact Picture" />
          </td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.popularity }}</td>
          <td>
          <span v-if="contact.wonOscar">🏆</span>
        </td>
        <td>
          <span v-if="contact.wonEmmy">🏆</span>
        </td>
        <td><button class="btn" @click='removeContact(contact.id)'>Delete</button></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scope>
.style{
  margin:0;
  padding:50px;
}
img {
  width: 50px;
  height: auto;
}
.btn{
  background-color: grey;
  border: none; 
  padding: 8px, 16px;
  color: white; 
}
tr{
  margin:20px;
  padding: 10px;
  text-align: center;
}
table-style{
  padding: 10px;
  text-align: center;

}
.btn-style button{
  background-color:lightblue;
  border: solid, 2px; 
  padding: 8px, 16px;
  color: white; 
}

</style>
