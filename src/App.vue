<template>
  <section>
    <h1>Iron-Contacts</h1>
    <div class="button-group">
      <button @click="addRandomContact">Add Random Contact</button>
      <button @click="sortByPopularity">Sort By Popularity</button>
      <button @click="sortByName">Sort By Name</button>
    </div>

    <table class="table">
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
        <tr v-for="(contact, index) in fiveContacts" :key="contact.id">
          <td>
            <img :src="contact.pictureUrl" :alt="contact.name" class="contact-picture">
          </td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.popularity.toFixed(2) }}</td>
          <td>{{ contact.wonOscar ? "🏆" : "" }}</td>
          <td>{{ contact.wonEmmy ? "🏆" : "" }}</td>
          <td>
            <button @click="removeContact(index)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup>
  import {ref, computed} from "vue";
  import contacts from "./contacts.json";

  //list of all contacts
  const contactsList = ref(contacts);
  //list of first five contacts
  const fiveContacts = ref(contactsList.value.slice(0, 5));

// Add New Random Contacts
const addRandomContact = () => {
  const notDisplayedContacts = contactsList.value.filter(contact => !fiveContacts.value.includes(contact));
  notDisplayedContacts.length ? fiveContacts.value.push(notDisplayedContacts[Math.floor(Math.random() * notDisplayedContacts.length)])
  : alert("Sorry! No more contacts to display");
};

// Sort Contacts by Name and Popularity
const sortByPopularity = () => {
  fiveContacts.value.sort((a, b) => b.popularity - a.popularity);
};

const sortByName = () => {
  fiveContacts.value.sort((a, b) => a.name.localeCompare(b.name));
};

// Remove Contacts
const removeContact = (index) => {
  fiveContacts.value.splice(index, 1);
};

</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  margin-bottom: 20px;
  font-size: 2.5em;
  font-weight: bold;
  color: #333;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  padding: 10px;
  background: linear-gradient(135deg, #2053fa, #3c1769);
  color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

button {
  margin: 10px;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

.table {
  border-collapse: collapse;
  width: 100%;
  max-width: 800px;
  margin: 20px 0;
}

th,
td {
  padding: 12px 15px;
  border: 1px solid #ddd;
  text-align: center;
}

th {
  background-color: #007bff;
  color: white;
}

.table img {
  width: 50px;
  height: auto;
  border-radius: 5px;
}
</style>