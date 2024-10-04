<script setup>
import { ref } from 'vue';
import contactsData from './contacts.json'; 

const contacts = ref(contactsData.slice(0, 5));

const addRandomContact = () => {
  const contactIds = contacts.value.map(contact => contact.id); // Obtener una lista de IDs
  const remainingContacts = contactsData.filter(
    contact => !contactIds.includes(contact.id) // Comparar solo los IDs
  );
  if (remainingContacts.length > 0) {
    const randomIndex = Math.floor(Math.random() * remainingContacts.length);
    const randomContact = remainingContacts[randomIndex];
    contacts.value.push(randomContact);
  }
};

const sortByName = () => {
  contacts.value.sort((a, b) => a.name.localeCompare(b.name));
};

const sortByPopularity = () => {
  contacts.value.sort((a, b) => b.popularity - a.popularity);
};

const deleteContact = (id) => {
  contacts.value = contacts.value.filter(contact => contact.id !== id);
};
</script>

<template>
  <div class="app-container">
    <h1 class="title">IronContacts</h1>

    <div class="buttons">
      <button class="btn btn-primary" @click="addRandomContact">Add Random Contact</button>
      <button class="btn btn-secondary" @click="sortByName">Sort by Name</button>
      <button class="btn btn-secondary" @click="sortByPopularity">Sort by Popularity</button>
    </div>

    <table class="table table-hover table-striped">
      <thead class="table-dark">
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
          <td><img :src="contact.pictureUrl" alt="contact picture" class="contact-image" /></td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.popularity.toFixed(2) }}</td>
          <td>{{ contact.wonOscar ? '🏆' : '' }}</td>
          <td>{{ contact.wonEmmy ? '⭐' : '' }}</td>
          <td>
            <button class="btn btn-danger" @click="deleteContact(contact.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

.app-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  font-family: 'Arial Black', sans-serif;
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.buttons {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.btn {
  font-size: 14px;
  padding: 10px 20px;
  border-radius: 30px;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #5a5a5a;
}

.table {
  font-family: 'Verdana', sans-serif;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

.table-hover tbody tr:hover {
  background-color: #f8f9fa;
}

.table td, .table th {
  text-align: center;
  vertical-align: middle;
  padding: 12px;
}

.table thead {
  background-color: #343a40;
  color: white;
}

.contact-image {
  width: 60px;
  height: 75px;
  border-radius: 25%;
  object-fit: cover;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

.btn-danger {
  background-color: #dc3545;
  color: white;
  border: none;
  transition: background-color 0.3s ease;
}

.btn-danger:hover {
  background-color: #c82333;
}
</style>
