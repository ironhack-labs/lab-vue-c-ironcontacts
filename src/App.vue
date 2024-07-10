
<template>
  <h1>Contact List</h1>
  <button @click="addRandomContact">Add Random Contact</button>
  <button @click="orderByName">Order By Name</button>
  <button @click="orderByPopularity">Order By Popularity</button>
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
          <td><img :src="contact.pictureUrl" alt="contact.name" width="50"></td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.popularity }}</td>
          <td v-if="contact.wonOscar">🏆</td>
          <td v-else></td>
          <td v-if="contact.wonEmmy">🏆</td>
          <td v-else></td>
          <td><button @click="deleteContact(contact.id)">Delete</button></td>
        </tr>
      </tbody>
    </table>
</template>

<script setup>
import contactsData from "../src/contacts.json";
import { ref } from 'vue';

const contacts = ref(contactsData.slice(0,5));

function addRandomContact() {
  contacts.value.push(contactsData[Math.floor(Math.random() * contactsData.length)]);
}

function orderByName() {
  contacts.value.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    return 0;
  });
}

function orderByPopularity() {
  contacts.value.sort((a, b) => b.popularity - a.popularity);
}

function deleteContact(id) {
   contacts.value.forEach((contact, index) => {
    if (contact.id === id) {
      contacts.value.push(contacts.value.splice(index, 1)[0]);
      contacts.value.pop();
    }
  });
}

</script>

<style>
</style>
