<script setup>
import { useContactsStore } from "./stores/contactStore.js";
import { ref, computed } from "vue";

const contactStore = useContactsStore();

const firstFiveContacts = computed(() => contactStore.allContacts);
const addRandomContact = () => contactStore.addRandomContact();
const sortedContactsPopularity = () => contactStore.sortByPopularity();
const sortedContactsName = () => contactStore.sortByName();
const deleteContact = (contactId) => contactStore.deleteContact(contactId);
</script>

<template>
  <h1>IronContacts</h1>
  <div class="allBtn">
    <button class="header-button" @click="addRandomContact">
      Add Random Contact
    </button>
    <button class="header-button" @click="sortedContactsPopularity">
      Sort by Popularity
    </button>
    <button class="header-button" @click="sortedContactsName">
      Sort by Name
    </button>
  </div>
  <table>
    <thead>
      <tr>
        <th>Picture</th>
        <th>Name</th>
        <th>Popularity</th>
        <th>Won Oscar</th>
        <th>Won Emmy</th>
        <th></th>
      </tr>
    </thead>
    <tbody id="contactList">
      <tr
        v-for="(contact, index) in firstFiveContacts"
        :key="contact.id"
        :class="{ 'gray-row': index % 2 === 0, 'white-row': index % 2 !== 0 }"
      >
        <td>
          <img
            :src="contact.pictureUrl"
            :alt="`profile image of actor ${contact.name}`"
          />
        </td>
        <td>
          <p>{{ contact.name }}</p>
        </td>
        <td>
          <p>{{ contact.popularity.toFixed(2) }}</p>
        </td>
        <td>
          <p>{{ contact.wonOscar ? "🏆" : "" }}</p>
        </td>
        <td>
          <p>{{ contact.wonEmmy ? "🏆" : "" }}</p>
        </td>
        <td>
          <button class="delete-btn" @click="deleteContact(contact.id)">
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.gray-row {
  background-color: #f0f0f0; /* Gris */
}

.white-row {
  background-color: #ffffff; /* Blanco */
}

h1 {
  padding-left: 25px;
  font-family: Arial, Helvetica, sans-serif;
}
.allBtn {
  display: flex;

  justify-content: start;
}

table {
  width: 50%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  font-family: Arial, Helvetica, sans-serif;
}
th {
  background-color: #7ac5ff6d;
}
img {
  max-width: 100px;
  max-height: 100px;  
}
.header-button {
  display: inline-block;
  padding: 10px 20px;
  margin: 25px 10px;
  background-color: #427eee;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
}

.header-button:hover {
  background-color: #2f05af;
}

.delete-btn {
  display: inline-block;
  padding: 10px 20px;
  margin: 25px 10px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
}

.delete-btn:hover {
  background-color: #c71919;
}
</style>