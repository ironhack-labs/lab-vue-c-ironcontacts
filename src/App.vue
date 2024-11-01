<script setup>
import contactsData from"./contacts.json";
import  { ref } from "vue";

const contacts = ref(contactsData.slice(0, 5));

const remainingContacts = ref(contactsData.slice(5));

const addRandomContact = ()=> {
  if (remainingContacts.value.length > 0) {
    const randomIndex = Math.floor(
      Math.random() * remainingContacts.value.length
    );

    const selectedContact = remainingContacts.value.splice(randomIndex, 1)[0];
    contacts.value.push(selectedContact);
  }
};

const sortByName = () => {
  contacts.value.sort((a, b) => a.name.localeCompare(b.name));
};

const sortByPopularity = () => {
  contacts.value.sort((a,b) => b.popularity - a.popularity);
};

const deleteContact = (contactId) => {
  contacts.value = contacts.value.filter(contact => contact.id !==contactId);
};
</script>

<template>
  <div class="buttons">
    <h1> Contact List</h1>
    <button @click="addRandomContact">Add Random Contact</button>
    <button @click="sortByName">Sort by Name</button>
    <button @click="sortByPopularity">Sort by Popularity</button>
    <table>
      <thread>
      <tr>
        <th>Picture</th>
        <th>Name</th>
        <th>Popularity</th>
        <th>Won an Oscar</th>
        <th>Won an Emmy</th>
        <th>Actions</th>
        </tr>
      </thread>

        <tr v-for="contact in contacts" :key="contact.id">
          <td>
            <img :src="contact.pictureUrl" alt="contact-picture"/>
          </td>
          <td> {{ contact.name }}</td>
          <td> {{ contact.popularity.toFixed(2)}}</td>
          <td> {{ contact.wonOscar ? "🏆" : "" }}</td>
          <td> {{ contact.wonEmmy ? "🧸" : "" }}</td>
          <td>
            <button @click="deleteContact(contact.id)">Delete</button>
          </td>
        </tr>
    </table>
  </div>
</template>

<style scoped>

h1 {
  text-align: center;
  font-size: 3rem;
  color: rgb(49, 49, 150);
}

img {
width:90px;
height:100px;
}

.buttons {
  margin: 10px;
  justify-content: center;
  margin-bottom: 20px;
  background-color: rgb(226, 226, 237);
}

button {
  background-color: rgb(102, 157, 240);
  color: white;
  padding: 10px 15px;
  border: 2px solid rgb(53, 92, 184);
 border-radius: 10% ;
}

button:hover {
  background-color: aqua;
}

table {
  width: 80%;
}

th{
  text-align: center;
  padding: 15px;
  background-color: rgb(144, 144, 177);
  color: white;
  border-radius: 10px;
}
</style>
