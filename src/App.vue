<script setup>
import contactData from "./contacts.json";
import { ref } from "vue";

const contacts = ref(contactData.slice(0,5));
const addRandomContact = (event) => {
    const randomContact = contactData[Math.floor(Math.random()* contactData.length)]
    contacts.value.push(randomContact);
}

const sortByPopularity = () => {
    contacts.value.sort((a,b)=>b.popularity -a.popularity);
};

const sortByName = () => {
    contacts.value.sort((a,b)=> a.name.localeCompare(b.name));
};

const deleteContact = (index) => {
  contacts.value.splice(index, 1);
};
</script>

<template>
  <h1>IronContacts</h1>
  <button @click="addRandomContact">Add random contact</button>
  <button @click="sortByPopularity">Sort by popularity</button>
  <button @click="sortByName">Sort by Name</button>
  <table>
    <tr>
      <th>Picture</th>
      <th>Name</th>
      <th>Popularity</th>
      <th>Won an Oscar</th>
      <th>Won an Emmy</th>
      <th>Actions</th>
    </tr>
    <tr v-for="contact in contacts">
      <td><img :src="contact.pictureUrl" width="40" /></td>
      <td>{{ contact.name }}</td>
      <td>{{ contact.popularity }}</td>
      <td v-if="contact.wonOscar">🏆</td>
      <td v-else></td>
      <td v-if="contact.wonEmmy">🏆</td>
      <td v-else></td>
      <td><button @click="deleteContact">Delete</button></td>
    </tr>
  </table>
</template>

<style></style>
