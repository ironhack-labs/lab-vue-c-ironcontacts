<script setup>
import { ref } from "vue"
import allContacts from "./contacts.json"

const initialContactsNum = 5

const displayedContacts = ref(allContacts.slice(0, initialContactsNum))
let nonDisplayedContacts = allContacts.filter(
  (contact, index) => index > initialContactsNum
)

const extractRandomContact = () => {
  const remainingContactsNum = nonDisplayedContacts.length
  if (remainingContactsNum < 1) {
    alert("No more contacts to display")
    return
  }

  const randomIndex = Math.floor(Math.random() * remainingContactsNum)
  const randomContact = nonDisplayedContacts[randomIndex]

  nonDisplayedContacts = nonDisplayedContacts.filter(
    (contact, index) => index !== randomIndex
  )

  displayedContacts.value.push(randomContact)
}

const restoreContact = (id) => {
  const contact = displayedContacts.value.find((contact) => contact.id === id)
  nonDisplayedContacts.push(contact)

  displayedContacts.value = displayedContacts.value.filter(
    (contact) => contact.id !== id
  )
}

const sortByPopularity = () => {
  displayedContacts.value.sort((a, b) => b.popularity - a.popularity)
}

const sortByName = () => {
  displayedContacts.value.sort((a, b) => a.name.localeCompare(b.name))
}
//
</script>

<template>
  <header>
    <h1>IronContacts</h1>
  </header>
  <main>
    <div class="actions-bar">
      <div class="actions-section">
        <button @click="extractRandomContact" class="plain-button">+</button>
      </div>
      <div class="actions-section">
        <span>Sort by:</span>
        <button @click="sortByPopularity" class="plain-button">
          popularity
        </button>
        <button @click="sortByName" class="plain-button">name</button>
      </div>
    </div>
    <table class="contacts-table" v-if="displayedContacts.length > 0">
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won Oscar</th>
          <th>Won Emmy</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in displayedContacts" :key="contact.id">
          <td class="profile-picture-cell">
            <img :src="contact.pictureUrl" :alt="`${contact.name}'s profile picture`" class="profile-picture" />
          </td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.popularity.toFixed(2) }}</td>
          <td>{{ contact.wonOscar ? "🏆" : "" }}</td>
          <td>{{ contact.wonEmmy ? "🌟" : "" }}</td>
          <td>
            <button @click="restoreContact(contact.id)" class="bordered-button">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No contacts to display</p>
  </main>
</template>

<style>
body {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  margin: 0;
  padding: 2rem 4rem;
  background-color: var(--background-color);
  color: var(--text-color);
}

h1 {
  color: var(--primary-color);
  font-weight: 400;
  font-size: 2rem;
}

.actions-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.actions-section {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}


.contacts-table {
  width: 100%;
  border-spacing: 0 0.5rem;
}

.contacts-table th {
  text-align: start;
  font-size: 0.7rem;
  text-transform: uppercase;
}

.profile-picture {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  object-position: center -10px;
  border: 1px solid var(--text-color);
}
</style>