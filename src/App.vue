<script setup>
  import contacts from "./contacts.json";
  import { ref } from "vue";

  const firstFiveContacts = ref(contacts.slice(0, 5));

  const remainingContacts = contacts.slice(5);

  function addRandomContact() {
    if (remainingContacts.length > 0) {
      const randomIndex = Math.floor(Math.random() * remainingContacts.length);
      const randomContact = remainingContacts.splice(randomIndex, 1)[0];
      firstFiveContacts.value.push(randomContact);
    } else {
      console.log("No more contacts to add");
    }
  }
  function sortByPopularity() {
    firstFiveContacts.value.sort((a, b) => b.popularity - a.popularity);
  }

  function sortByName() {
    firstFiveContacts.value.sort((a, b) => a.name.localeCompare(b.name));
  }

  function removeContact(contactId) {
    firstFiveContacts.value = firstFiveContacts.value.filter((contact) => contact.id !== contactId);
  }
</script>

<template>
  <section>
    <h1>IronContacts</h1>
    <button @click="addRandomContact">Add Random Contact</button>
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
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(contact, index) in firstFiveContacts"
          :key="contact.id">
          <td>
            <img
              :src="contact.pictureUrl"
              alt="contact.name" />
          </td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.popularity.toFixed(2) }}</td>
          <td>{{ contact.wonOscar ? "🏆" : "" }}</td>
          <td>{{ contact.wonEmmy ? "🏆" : "" }}</td>
          <td><button @click="removeContact(contact.id)">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped>
  h1 {
    color: #608334;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }

  table,
  th,
  td {
    border: 1px solid #ddd;
  }

  th,
  td {
    text-align: left;
    padding: 8px;
    text-align: center;
    color: #608334;
  }

  th {
    background-color: #bdecb6;
    color: #608334;
  }

  button {
    background-color: #bdecb6;
    border: none;
    color: #608334;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 12px;
    transition-duration: 0.4s;
  }

  button:hover {
    background-color: white;
    color: #608334;
    border: 1px solid #608334;
  }

  img {
    width: 50px;
    height: auto;
    border-radius: 10%;
  }
  body {
    font-family: "Arial", sans-serif;
    padding: 20px;
   
  }
</style>
