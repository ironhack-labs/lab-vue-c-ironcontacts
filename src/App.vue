<template>
  <div>
    <h1>Producer Contacts</h1>
    <button @click="addRandomContact">Add Random Contact</button>
    <button @click="sortByName">Sort by Name</button>
    <button @click="sortByPopularity">Sort by Popularity</button>
    <table>
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won an Oscar</th>
          <th>Won an Emmy</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in contacts" :key="contact.id">
          <td>
            <img :src="contact.pictureUrl" alt="Contact Picture" width="50" height="50">
          </td>
          <td>{{ contact.name }}</td>
          <td>{{ roundedPopularity(contact.popularity) }}</td>
          <td align="center">{{ contact.wonOscar ? '🏆' : '' }}</td>
          <td align="center">{{ contact.wonEmmy ? '🏆' : '' }}</td>
          <td align="center">
            <button @click="deleteContact(contact.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import contactsData from './contacts.json';
import { ref, onMounted } from 'vue';

const allContacts = ref([]);
const contacts = ref([]);

onMounted(() => {
  allContacts.value = [...contactsData];
  // Initialize with the first 5 contacts
  contacts.value = allContacts.value.slice(0, 5);
  // Remove the initial 5 from allContacts
  allContacts.value.splice(0, 5);
});

const addRandomContact = () => {
  if (allContacts.value.length > 0) {
    const randomIndex = Math.floor(Math.random() * allContacts.value.length);
    const randomContact = allContacts.value.splice(randomIndex, 1)[0]; // Remove from remaining
    contacts.value.push(randomContact);
  } else {
    alert('No more new contacts available.');
  }
};

const sortByName = () => {
  const sortedContacts = [...contacts.value].sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
  contacts.value = sortedContacts;
};

const sortByPopularity = () => {
  const sortedContacts = [...contacts.value].sort((a, b) => b.popularity - a.popularity);
  contacts.value = sortedContacts;
};

const deleteContact = (id) => {
  contacts.value = contacts.value.filter(contact => contact.id !== id);
};

const roundedPopularity = (popularity) => {
  return parseFloat(popularity).toFixed(2);
};
</script>

<style scoped>
button {
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
  margin-right: 0.5rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

img {
  vertical-align: middle;
  border-radius: 50%;
}

table button {
  margin: 0;
  padding: 0.3rem 0.6rem;
  background-color: #f44336;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  border: none;
}
</style>