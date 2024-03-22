<script setup>
import { useContactsStore } from "./stores/contactsStore.js";
import { storeToRefs } from "pinia";

const contactsStore = useContactsStore();

const { contacts, displayContactsArray } = storeToRefs(contactsStore);
const { addRandomContact } = contactsStore;

console.log(displayContactsArray.value);

</script>

<template>
  <button class="add-contact-button" @click="addRandomContact">Add Random Contact</button>
  <table>
    <thead>
      <tr>
        <th>Picture</th>
        <th>Name</th>
        <th>Popularity</th>
        <th>Won Oscar</th>
        <th>Won Emmy</th>
      </tr>
    </thead>
    <tbody id="contactList">
      <tr v-for="(contact, index) in displayContactsArray" :key="index">
        <td>
          <img :src="contact.pictureUrl" :alt="`profile image of actor ${contact.name}`">
        </td>
        <td>
          <p>{{ contact.name }}</p>
        </td>
        <td>
          <p>{{ contact.popularity.toFixed(2) }}</p>
        </td>
        <td>
          <p>{{ contact.wonOscar ? '🏆' : '' }}</p>
        </td>
        <td>
          <p>{{ contact.wonEmmy ? '🏆' : '' }}</p>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  width: 50%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}

img {
  max-width: 100px;
  max-height: 100px;
}

.add-contact-button {
  display: inline-block;
  padding: 10px 20px;
  margin: 25px 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.3s;
}

.add-contact-button:hover {
  background-color: #45a049;
}
</style>
