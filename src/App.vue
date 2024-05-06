<script setup>
import { ref, computed } from "vue";
import contacts from "./contacts.json";

const contactsList = ref(contacts);
//console.log(contactsList);

//para solo mostrar 5
const fiveContacts = ref(contactsList.value.slice(0, 5));

//interaction 3
const addRandomContact = () => {
  const notDisplayedContacts = contactsList.value.filter(
    (contact) => !fiveContacts.value.includes(contact)
  );
  if (notDisplayedContacts.length > 0) {
    const randomIndex = Math.floor(Math.random() * notDisplayedContacts.length);
    fiveContacts.value.push(notDisplayedContacts[randomIndex]);
  } else {
    alert("Sorry! No more contacts to display");
  }
};

//interaction 4
const sortByPopularity = () => {
  fiveContacts.value.sort((a, b) => b.popularity - a.popularity);
};
const sortByName = () => {
  fiveContacts.value.sort((a, b) => a.name.localeCompare(b.name));
}

//interaction 5
const removeContact = (index) => {
  fiveContacts.value.splice(index, 1);
};

</script>


<template>
  <section>
    <h1>Iron-Contacts</h1>
    <div>
      <button @click="addRandomContact">Add Random Contact</button>
      <button @click="sortByPopularity">Sort By Popularity</button>
      <button @click="sortByName">Sort By Name</button>
    </div>

    <table class="table">
      <tr>
        <th>Picture</th>
        <th>Name</th>
        <th>Popularity</th>
        <th>Won an Oscar</th>
        <th>Won an Emmy</th>
        <th>Actions</th>
      </tr>
      <tr v-for="(contact, index) in fiveContacts" :key="index">
        <!-- otra forma <tr v-for="(contact, index) in contactsList" :key="index" v-if="index < 5"> -->
        <td><img :src="contact.pictureUrl" /></td>
        <td>{{ contact.name }}</td>
        <td>{{ contact.popularity.toFixed(2) }}</td>
        <td>{{ contact.wonOscar ? "🏆" : "" }}</td>
        <td>{{ contact.wonEmmy ? "🏆" : "" }}</td>
        <td>
          <button @click="removeContact(index)">Delete</button>
        </td>
      </tr>
    </table>
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
button {
  margin: 20px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: blue;
  color: white;
}
.table {
  border-collapse: collapse;
  width: 70%;
  margin: 20px;
}
th,
td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
}
.table img {
  width: 100px;
  height: auto;
}
</style>
