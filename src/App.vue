<template>
  <div>
    <h1>Contacts</h1>
    <button @click="addRandomContact" class="btn">Add a random contact</button>
    <button @click="sortByName" class="btn">Sort by Name</button>
    <button @click="sortByPopularity" class="btn">Sort by Popularity</button>
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
        <tr v-for="contact in contactsRef" :key="contact.id">
          <td>
            <img
              :src="contact.pictureUrl"
              alt="Picture"
              class="contact-image"
            />
          </td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.popularity }}</td>
          <td>
            <span v-if="contact.wonOscar"> 🏆 </span>
          </td>
          <td>
            <span v-if="contact.wonEmmy"> 🏆 </span>
          </td>
          <td><button @click="deleteContact(contact.id)">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from "vue";
import contacts from "./contacts.json";

const contactsRef = ref(contacts.slice(0, 5));
const remainingContacts = ref(contacts.slice(5));

const addRandomContact = () => {
  if (remainingContacts.value.length === 0) {
    alert("No more contacts to add!");
    return;
  }

  const randomIndex = Math.floor(
    Math.random() * remainingContacts.value.length
  );
  const randomContact = remainingContacts.value.splice(randomIndex, 1)[0];

  contactsRef.value.push(randomContact);
};
const sortByName = () => {
  contactsRef.value.sort((a, b) => a.name.localeCompare(b.name));
};
const sortByPopularity = () => {
  contactsRef.value.sort((a, b) => b.popularity - a.popularity);
};
const deleteContact = (id) => {
  contactsRef.value = contactsRef.value.filter((contact) => contact.id !== id);
};
</script>

<style scoped>
body {
  background: #ddd;
}

h1 {
  text-align: center;
}
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

th {
  background-color: #ffb6c1;
}

.contact-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.btn {
  background-color: #ff69b4; /* Hot pink background */
  border: none; /* Remove default border */
  color: white; /* White text */
  padding: 10px 20px; /* Padding around the button */
  text-align: center; /* Center the text */
  text-decoration: none; /* Remove underline from text */
  display: inline-block; /* Display as an inline-block element */
  font-size: 16px; /* Font size */
  margin: 4px 2px; /* Margin around the button */
  cursor: pointer; /* Pointer cursor on hover */
  border-radius: 12px; /* Rounded corners */
  transition: background-color 0.3s ease; /* Smooth transition for background color */
}

.btn:hover {
  background-color: #ff1493; /* Darker pink shade on hover */
}
</style>
