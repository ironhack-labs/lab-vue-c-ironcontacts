<template>
  <section class="contact-section">
    <div class="container">
      <h1>IronContacts</h1>
      <button @click="addRandomContact">Add Random Contact</button>
      <button @click="sortAndDisplayContactsByName">Sort by name</button>
    <table>
      <thead>
        <tr>
          <th>Foto</th>
          <th>Nombre</th>
          <th>Popularidad</th>
          <th>Won an Oscar</th>
          <th>Won an Emmy</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in displayedContacts">
          <td>
            <img :src="contact.pictureUrl" alt="picture" class="contact-img">
          </td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.popularity }}</td>
          <td v-if="contact.wonOscar">
            <img src="https://cdn-icons-png.flaticon.com/512/536/536056.png" alt="Won Oscar" class="won-award-img">
          </td>
          <td v-if="contact.wonEmmy">
            <img src="https://cdn-icons-png.flaticon.com/512/536/536056.png" alt="Won Oscar" class="won-award-img">
          </td>
        </tr>
      </tbody>
    </table>
    </div>
    
  </section>
 
</template>

<script setup>
import { ref } from 'vue';
import contacts from './contacts.json';

const contactsFull = ref(contacts);
const contactsFirst5 = ref(contactsFull.value.slice(0,5));
const additionalContacts = ref([]);
const displayedContacts = ref(contactsFirst5);

function getRandomContact() {
  const randomIndex = Math.floor(
  Math.random() * (contactsFull.value.length - contactsFirst5.value.length)) 
  + contactsFirst5.value.length;
  const randomContact = contactsFull.value[randomIndex];
  return randomContact;
}

function addRandomContact() {
  const randomContact = getRandomContact();
  contactsFirst5.value.push(randomContact);
}

function sortAndDisplayContactsByName() {
  const sortedContactsByName = contactsFirst5.value.concat(additionalContacts.value).sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  displayedContacts.value = sortedContactsByName;
}

</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.container h1 {
  font-size: 40px;
}

.contact-section {
  max-width: 800px;
  margin: 0 auto;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
  color: #333;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

.contact-img {
  width: auto;
  height: 90px;
}

.won-award-img {
  width: auto;
  height: 30px;
}
</style>
