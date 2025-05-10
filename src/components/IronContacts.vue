<script setup>
import allContacts from '@/contacts.json';
import { ref } from 'vue';

const contacts = ref(allContacts.slice(0, 5));

const addContact = () => {
  console.log('clicado')
  const random = Math.floor(Math.random() * (allContacts.length - 0) + 0);
  console.log("random: ", random);
  contacts.value.push(allContacts[random])
}

const sortByName = () => {
  contacts.value.sort((a, b) => {
    return a.name.localeCompare(b.name)
  })
}

const sortByPopularity = () => {
  contacts.value.sort((a, b) =>
    b.popularity - a.popularity
  )
}

const deleteContact = (id) => {
  contacts.value = contacts.value.filter(contact => contact.id !== id)

}

</script>

<template>
  <div>

    <div class="header">
      <h1>iron contacts</h1>
      <button @click="addContact">Add Random Contact</button>
      <button @click="sortByPopularity">Sort by popularity</button>
      <button @click="sortByName">Sort by name</button>
    </div>


    <div class="contacts">
      <table>
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
          <tr v-for="contact in contacts" :key="contact.id">
            <td><img :src="contact.pictureUrl" alt=""></td>
            <td>{{ contact.name }}</td>
            <td>{{ contact.popularity }}</td>
            <td v-if="(contact.wonOscar === true)">🏆</td>
            <td v-else="(contact.wonOscar === true)"></td>
            <td v-if="(contact.wonEmmy === true)">🌟</td>
            <td v-else="(contact.wonEmmy === true)"></td>
            <td>
              <button @click="deleteContact(contact.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.header {
  background-color: white;
}

img {
  width: 60px;
}

.contacts {
  margin: 0 auto;
  background-color: aqua;
  width: 100%;
  background: linear-gradient(90deg,
      #d3b370 0%,
      #b49357 100%)
}

button {
  margin: 2rem;
  color: #000000;
  padding: 0.5rem 2rem;
  border-radius: 1.5rem;
  background-color: #eacc80;
  border: none;
}

.contacts table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 2rem 1rem;
  table-layout: auto;
}

.contacts th,
.contacts td {
  padding: 0.75rem 1.5rem;
  text-align: left;
  vertical-align: middle;
}

.contacts img {
  width: 60px;
  display: block;
}

.contacts th:nth-child(1),
.contacts td:nth-child(1) {
  width: 80px;
}

.contacts th:nth-child(2),
.contacts td:nth-child(2) {
  min-width: 150px;
}
</style>
