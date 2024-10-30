<script setup>
import { callWithAsyncErrorHandling, ref } from "vue";
import contactsData from "./contacts.json";

const contacts = ref(contactsData.slice(0, 6));

const addRandomContact = () => {
  // Find remaining contacts not currently in the contacts list
  const remainingContacts = contactsData.filter(contact =>
    !contacts.value.some(c => c.id === contact.id)
  );

  if (remainingContacts.length > 0) {
    // Select a random contact from the remaining ones
    const randomIndex = Math.floor(Math.random() * remainingContacts.length);
    const randomContact = remainingContacts[randomIndex];

    // Add the random contact to the displayed contacts
    contacts.value.push(randomContact);
  } else {
    alert("No more contacts to add!");
  }
};

const sortByName = () => {
  contacts.value.sort((a, b) => a.name.localeCompare(b.name));
};

const sortByPopularity = () => {
  contacts.value.sort((a, b) => b.popularity - a.popularity);
};

const deleteContact = (contactId) => {
  contacts.value = contacts.value.filter(contact => contact.id !== contactId);
};
</script>

<template>
  <h1>IronContacts</h1>
  <div class="button-container">
    <button @click="addRandomContact">Add Random Contact</button>
    <button @click="sortByName">Sort by Name</button>
    <button @click="sortByPopularity">Sort by Popularity</button>
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
      <tr v-for="contact in contacts" :key="contact.id">
        <td><img :src="contact.pictureUrl" alt="Contact Picture" :style="{ width: '100px', height: '100px' }"></td>
        <td>{{ contact.name }}</td>
        <td>{{ contact.popularity.toFixed(2) }}</td>
        <td>{{ contact.wonOscar ? '🏆' : '' }}</td>
        <td>{{ contact.wonEmmy ? '🌟' : '' }}</td>
        <td>
          <button @click="deleteContact(contact.id)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
h1 {
  text-align: center;
}

.button-container {
  display: flex;
  justify-content: space-evenly;

}

button {
  background-color: #e6b83a;
  color: white;
  font-size: 16px;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  margin-bottom: 10px
}

button:hover {
  background-color: #ffca37;
}

table {
  width: 80%;
}

th,
td {
  padding: 8px;
  text-align: center;
  font-size: 16px;
}

th {
  font-size: 18px;
}
</style>
