<script setup>
// Import the ref function from Vue to create reactive variables
import { ref } from "vue";

// Import the contacts data from the JSON file
import json from "./contacts.json";

// Initialize the contacts ref variable with the first 5 contacts from the JSON data
let contacts = ref([json[0], json[1], json[2], json[3], json[4]]);

// Function to add a random contact from the JSON data to the contacts array
function addRandomContact() {
  contacts.value.push(json[Math.floor(Math.random() * json.length)]);
}

// Function to sort the contacts array by name in ascending order
function orderByName() {
  contacts.value.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
}

// Function to sort the contacts array by popularity in descending order
function orderByPopularity() {
  contacts.value.sort((a, b) => b.popularity - a.popularity);
}

// Function to delete a contact from the contacts array based on the contact's ID
function deleteContact(id) {
  contacts.value.forEach((contact, index) => {
    if (contact.id === id) {
      // Move the contact to the end of the array and then remove it
      contacts.value.push(contacts.value.splice(index, 1)[0]);
      contacts.value.pop();
    }
  });
}
</script>

<template>
  <div>
    <h1>Contacts</h1>

    <!-- Iteration 1: Display the basic contact list with picture, name, and popularity -->
    <h2>Iteration 1</h2>
    <table>
      <thead>
        <tr>
          <th><strong>Picture</strong></th>
          <th><strong>Name</strong></th>
          <th><strong>Popularity</strong></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in contacts" :key="contact.id">
          <td>
            <img
              class="normal-size"
              :src="contact.pictureUrl"
              alt="Contact Picture"
            />
          </td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.popularity }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Iteration 2: Add columns for Oscar and Emmy awards -->
    <h2>Iteration 2</h2>
    <table>
      <thead>
        <tr>
          <th><strong>Picture</strong></th>
          <th><strong>Name</strong></th>
          <th><strong>Popularity</strong></th>
          <th><strong>Oscar</strong></th>
          <th><strong>Emmy</strong></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in contacts" :key="contact.id">
          <td>
            <img
              class="normal-size"
              :src="contact.pictureUrl"
              alt="Contact Picture"
            />
          </td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.popularity }}</td>
          <td v-if="contact.wonOscar">🏆</td>
          <td v-else></td>
          <td v-if="contact.wonEmmy">🏆</td>
          <td v-else></td>
        </tr>
      </tbody>
    </table>

    <!-- Iteration 3: Add a button to add a random contact -->
    <h2>Iteration 3</h2>
    <button @click="addRandomContact">Add random contact</button>
    <table>
      <thead>
        <tr>
          <th><strong>Picture</strong></th>
          <th><strong>Name</strong></th>
          <th><strong>Popularity</strong></th>
          <th><strong>Oscar</strong></th>
          <th><strong>Emmy</strong></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in contacts" :key="contact.id">
          <td>
            <img
              class="normal-size"
              :src="contact.pictureUrl"
              alt="Contact Picture"
            />
          </td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.popularity }}</td>
          <td v-if="contact.wonOscar">🏆</td>
          <td v-else></td>
          <td v-if="contact.wonEmmy">🏆</td>
          <td v-else></td>
        </tr>
      </tbody>
    </table>

    <!-- Iteration 4: Add buttons to sort contacts by name and popularity -->
    <h2>Iteration 4</h2>
    <button @click="addRandomContact">Add random contact</button>
    <button @click="orderByName">Order By Name</button>
    <button @click="orderByPopularity">Order By Popularity</button>
    <table>
      <thead>
        <tr>
          <th><strong>Picture</strong></th>
          <th><strong>Name</strong></th>
          <th><strong>Popularity</strong></th>
          <th><strong>Oscar</strong></th>
          <th><strong>Emmy</strong></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in contacts" :key="contact.id">
          <td>
            <img
              class="normal-size"
              :src="contact.pictureUrl"
              alt="Contact Picture"
            />
          </td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.popularity }}</td>
          <td v-if="contact.wonOscar">🏆</td>
          <td v-else></td>
          <td v-if="contact.wonEmmy">🏆</td>
          <td v-else></td>
        </tr>
      </tbody>
    </table>

    <!-- Iteration 5: Add a delete button to remove a contact -->
    <h2>Iteration 5</h2>
    <button @click="addRandomContact">Add random contact</button>
    <button @click="orderByName">Order By Name</button>
    <button @click="orderByPopularity">Order By Popularity</button>
    <table>
      <thead>
        <tr>
          <th><strong>Picture</strong></th>
          <th><strong>Name</strong></th>
          <th><strong>Popularity</strong></th>
          <th><strong>Oscar</strong></th>
          <th><strong>Emmy</strong></th>
          <th><strong>Actions</strong></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in contacts" :key="contact.id">
          <td>
            <img
              class="normal-size"
              :src="contact.pictureUrl"
              alt="Contact Picture"
            />
          </td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.popularity }}</td>
          <td v-if="contact.wonOscar">🏆</td>
          <td v-else></td>
          <td v-if="contact.wonEmmy">🏆</td>
          <td v-else></td>
          <td><button @click="deleteContact(contact.id)">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
/* Basic styling for the app */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

/* Styling for the images to maintain a consistent size */
.normal-size {
  width: 100px;
}
</style>
