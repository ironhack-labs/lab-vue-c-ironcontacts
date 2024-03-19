<script setup>
import { ref, watch } from "vue";
import Contacts from "./contacts.json"

const contacts = ref(Contacts);

function fiveContacts(contactsJson) {
  contacts.value = contactsJson.slice(0, 5);
}

fiveContacts(Contacts);

watch(contacts, () => {
  fiveContacts(Contacts);
});

</script>

<template>
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
      <tr v-for="(contact, index) in contacts" :key="index">
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
</style>
