<template>
  <section>
    <button @click="addRandomContact">Add random Contact</button>
    <button @click="sortByPopularity">Sort by popularity</button>
    <button @click="sortByName">Sort by name</button>
    <table>
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won an Oscar</th>
          <th>Won an Emmy</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in contacts" :key="contact.id">
          <td>
            <img :src="contact.pictureUrl" alt="Contact Picture" width="50" />
          </td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.popularity }}</td>
          <td>
            <span v-if="contact.wonOscar">🏆</span>
          </td>
          <td>
            <span v-if="contact.wonEmmy">🏆</span>
          </td>
          <td>
            <button @click="deleteContact(contact.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup>
import { ref } from "vue";
import contactsData from "./contacts.json";

const contacts = ref(contactsData.slice(0, 5));
const randomContacts = ref(contactsData.slice(5));

const addRandomContact = () => {
  if (randomContacts.value.length > 0) {
    const randomContact = randomContacts.value.splice(
      Math.floor(Math.random() * randomContacts.value.length),
      1
    )[0];
    contacts.value.push(randomContact);
  }
};

const sortByPopularity = () => {
  contacts.value.sort((a, b) => b.popularity - a.popularity);
};

const sortByName = () => {
  contacts.value.sort((a, b) => a.name.localeCompare(b.name));
};

const deleteContact = (id) => {
  const index = contacts.value.findIndex((contact) => contact.id === id);
  if (index !== -1) {
    contacts.value.splice(index, 1);
  }
};
</script>

<style>
table {
 width: 100%;
 border-collapse: separate;
 border-spacing: 0;
 border-radius: 10px;
 overflow: hidden;
 background-color: #f9f9f9; 
 box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); 
}

th, td {
 padding: 15px;
 text-align: left;
 border-bottom: 1px solid #ddd;
}

th {
 background-color: #f2f2f2; 
 color: #333; 
}

td {
 background-color: #fff; 
 color: #666; 
}

tr:hover {
 background-color: #f2f2f2; 
}

button {
 background-color: #ff9800; 
 color: black; 
 border: none;
 border-radius: 5px; 
 padding: 10px 20px;
 margin: 10px;
 cursor: pointer;
 box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.3);
 transition: background-color 0.3s ease; 
}

button:hover {
 background-color: #e68900; 
}

</style>
