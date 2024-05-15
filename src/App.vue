<template>
  <div class="background">
    <h1>Contacts</h1>
    <div class="button-style">
      <button @click="addRandomContact">Add Random Contact</button>
      <button @click="sortByName">Sort by Name</button>
      <button @click="sortByPopularity">Sort by Popularity</button>
    </div>
    <table class="table-style">
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won Oscar</th>
          <th>Won Emmy</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in contactsList" :key="contact.id">
          <td>
            <img
              :src="contact.pictureUrl"
              alt="Contact Picture"
              style="width: 50px; height: 50px"
            />
          </td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.popularity }}</td>
          <td>
            <span v-if="contact.wonOscar">🏆</span>
          </td>
          <td>
            <span v-if="contact.wonEmmy">🏆</span>
          </td>
          <td><button @click="removeContact(contact.id)">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from "vue";
import contacts from "./contacts.json";

const contactsList = ref(contacts.slice(0, 5));

const addRandomContact = () => {
  const remainingContacts = contacts.filter(
    (contact) => !contactsList.value.includes(contact)
  );
  if (remainingContacts.length > 0) {
    const randomIndex = Math.floor(Math.random() * remainingContacts.length);
    const randomContact = remainingContacts[randomIndex];
    contactsList.value.push(randomContact);
  } else {
    console.log("All contacts have been displayed");
  }
};

const sortByName = () => {
  contactsList.value.sort((a, b) => a.name.localeCompare(b.name));
};

const sortByPopularity = () => {
  contactsList.value.sort((a, b) => b.popularity - a.popularity);
};

const removeContact = (id) => {
  const index = contactsList.value.findIndex((contact) => contact.id === id);
  if (index !== -1) {
    contactsList.value.splice(index, 1);
    contactsList.value = [...contactsList.value];
  }
};
</script>

<style setup>
body {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
}

img {
  width: 50px;
  height: auto;
}

.background {
  padding: 30px;
}

button {
  background-color: rgb(173, 202, 199);
  color: white;
  padding: 8px, 25px;
  font-size: 14px;
  border: none;

}

.button-style {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width:60%;
  margin:20px,0;

}


.table-style {
  width: 60%;
  border-collapse: collapse;
  padding: 8px;
  text-align: left;
}

.table-style td {
  padding: 3cqmax, 8px;
}


.table-style th {
  padding: 30px, 8px;
}
</style>
