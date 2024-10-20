// src/App.vue
<script setup>
import { ref } from "vue";
import contactsData from "./contacts.json";

const displayedContacts = ref(contactsData.slice(0, 5));

const remainingContacts = ref(contactsData.slice(5));

const addRandomContact = () => {
  if (remainingContacts.value.length > 0) {
    const randomIndex = Math.floor(
      Math.random() * remainingContacts.value.length
    );
    const selectedContact = remainingContacts.value.splice(randomIndex, 1)[0];
    displayedContacts.value.push(selectedContact);
  }
};

const sortByName = () => {
  displayedContacts.value.sort((a, b) => a.name.localeCompare(b.name));
};

const sortByPopularity = () => {
  displayedContacts.value.sort((a, b) => b.popularity - a.popularity);
};

const deleteContact = (id) => {
  displayedContacts.value = displayedContacts.value.filter(
    (contact) => contact.id !== id
  );
};
</script>

<template>
  <h1>Contact List</h1>
  <div class="cta">
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
        <th>Won an Oscar</th>
        <th>Won an Emmy</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="contact in displayedContacts" :key="contact.id">
        <td>
          <img :src="contact.pictureUrl" alt="contact-picture" />
        </td>
        <td>{{ contact.name }}</td>
        <td>{{ contact.popularity.toFixed(2) }}</td>
        <td>
          <span v-if="contact.wonOscar">🏆</span>
        </td>
        <td>
          <span v-if="contact.wonEmmy">✨</span>
        </td>
        <td>
          <button @click="deleteContact(contact.id)" class="dlt">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

h1 {
  text-align: center;
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 20px;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
}

.cta {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 20px;
}

button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #2980b9;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  padding: 15px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #2c3e50;
  color: white;
}

tr:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}

img {
  width: 100px;
  height: 115px;
  border-radius: 15%;
  object-fit: cover;
}

.delete-btn {
  background-color: #e74c3c;
}

.delete-btn:hover {
  background-color: #c0392b;
}

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }

  button {
    padding: 8px 15px;
    font-size: 0.9rem;
  }

  th,
  td {
    padding: 10px;
  }
}
</style>
