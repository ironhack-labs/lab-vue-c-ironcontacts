<template>
  <div>
    <h1>Contacts</h1>
    <div class="group-buttons">
      <button @click="addRandomContact" class="add-btn">
        Add Random Contact
      </button>
      <button @click="sortByPorpularity" class="add-btn">
        Sort by popularity
      </button>
      <button @click="sortByName" class="add-btn">Sort by name</button>
    </div>
    <table>
      <thead>
        <tr>
          <td>Picture</td>
          <td>Name</td>
          <td>Popularity</td>
          <td>Won Oscar</td>
          <td>Won Emmy</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in displayedContactList" :key="contact.id">
          <td>
            <img
              :src="contact.pictureUrl"
              alt="Contact Image"
              style="width: 75px; height: auto" />
          </td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.popularity.toFixed(2) }}</td>
          <td>{{ contact.wonOscar ? "🏆" : "" }}</td>
          <td>{{ contact.wonEmmy ? "🏆" : "" }}</td>
          <td>
            <button @click="deleteContact(contact.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from "vue";
import contactsData from "./contacts.json";

const allContacts = ref(contactsData);
const displayedContactList = ref([]);

displayedContactList.value = allContacts.value.slice(0, 5);

const addRandomContact = () => {
  const availableContacts = allContacts.value.filter(
    (contact) => !displayedContactList.value.includes(contact)
  );

  if (availableContacts.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableContacts.length);
    displayedContactList.value.push(availableContacts[randomIndex]);
  } else {
    alert("All contacts are already displayed!");
  }
};

const sortByPorpularity = () => {
  displayedContactList.value.sort((a, b) => b.popularity - a.popularity);
};

const sortByName = () => {
  displayedContactList.value.sort((a, b) =>
    a.name < b.name ? -1 : a.name > b.name ? 1 : 0
  );
};

const deleteContact = (contactId) => {
  displayedContactList.value = displayedContactList.value.filter(
    (contact) => contact.id !== contactId
  );
};
</script>

<style>
body {
  background: rgb(200, 215, 247);
  color: rgb(0, 0, 0);
  display: flex;
  flex-direction: column;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.group-buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
}

h1 {
  text-align: center;
  font-size: 4vh;
}

.add-btn {
  background-color: rgb(47, 67, 110);
  width: 200px;
  height: 50px;
  color: white;
  padding: 10px;
  font-size: 15px;
  margin-bottom: 20px;
  font-weight: bold;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  cursor: pointer;
}
table {
  margin: 0 auto;
  width: 100%;
  border-collapse: collapse;
  border: 1px solid white;
  text-align: center;
  background-color: rgb(47, 67, 110);
  color: white;
  padding: 10px;
  font-size: 20px;
  font-weight: bold;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

table tbody tr {
  background-color: #072b50;
}

table tbody tr:nth-child(odd) {
  background-color: #104f8d;
}
</style>
