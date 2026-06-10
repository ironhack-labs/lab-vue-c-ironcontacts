<template>
  <div class="body">

    <h2>Iron Contacts</h2>

    <button class="btn" @click="addRandomContact">Add A Random Contact</button>

    <button class="btn" @click="sortByName">Sort Alphabetically</button>

    <button class="btn" @click="sortByPopularity">Sort By Popularity</button>

    <table class="table">
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won Oscar</th>
          <th>Won Emmy</th>
          <th>Delete Button</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="contact in contacts" :key="contact.id">
          <td>
            <img
              class="avatar"
              :src="contact.pictureUrl"
              alt="contact image"
              width="60"
              height="60"
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

          <td>
            <button class="btnDelete" @click="deleteContacts(contact.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import contactsdata from '../src/contacts.json'

  const contacts = ref(contactsdata.slice(0,5))

  const remainingContacts = ref(contactsdata.slice(5))

  function addRandomContact() {
  if (remainingContacts.value.length === 0) return

  const randomIndex = Math.floor(
    Math.random() * remainingContacts.value.length
  )

  const randomContact = remainingContacts.value[randomIndex]

  contacts.value.push(randomContact)
  remainingContacts.value.splice(randomIndex, 1)
  }

  function sortByName() {
  contacts.value = [...contacts.value].sort((a, b) =>
    a.name.localeCompare(b.name)
  )
  }

function sortByPopularity() {
  contacts.value = [...contacts.value].sort((a, b) =>
    b.popularity - a.popularity
  )
  }

function deleteContacts(id){
  contacts.value = contacts.value.filter(
    contacts => contacts.id !== id
  )
}
</script>

<style>
  body {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 18px; 
  text-align: center;
  margin: 0;
}
.btn:hover {
  background: #f2f2f2;
}

.table {
  width: 90%;
  margin: 0 auto;
  border-collapse: collapse;
  text-align: center;
}

.table th {
  padding: 12px;
  border-bottom: 2px solid #ddd;
  font-weight: 600;
}

.table td {
  padding: 12px;
  border-bottom: 1px solid #eee;
}

.table tr:hover {
  background: #fafafa;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
.btnDelete:hover {
  background: #e60000;
}
</style>
