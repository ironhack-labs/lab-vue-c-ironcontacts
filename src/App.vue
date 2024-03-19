<script setup>
import { ref } from "vue";
import Contacts from "./contacts.json"

const contacts = ref(Contacts);

function fiveContacts(contactsJson) {
  contacts.value = contactsJson.slice(0, 5);
}

fiveContacts(Contacts);

</script>

<template>
  <!-- <ul class="contacts-container" v-for="(contact, index) in contacts" :key="index">
    <li>{{ contact.name }}</li>
  </ul> -->

  <table>
    <thead>
      <tr>
        <th>Picture</th>
        <th>Name</th>
        <th>Popularity</th>
      </tr>
    </thead>
    <tbody id="contactList">
      <!-- Table rows will be dynamically generated here -->
      <tr v-for="(contact, index) in contacts" :key="index">
        <td>
          <img :src="contact.pictureUrl" alt="" srcset="">
        </td>
        <td>
          <p>{{ contact.name }}</p>
        </td>
        <td>
          <p>{{ contact.popularity.toFixed(2) }}</p>
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
</style>
