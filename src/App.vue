<template>
  <div class="container">
    <div class="actions">
      <button @click="addRandomContact" :disabled="remainingContacts.length === 0">
        Add Random Contact
      </button>
      <button @click="sortByName">
        Sort by Name
      </button>
      <button @click="sortByPopularity">
        Sort by Popularity
      </button>
    </div>

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
        <tr v-for="contact in contactsList" :key="contact.id">
          <td>
            <img :src="contact.pictureUrl" :alt="contact.name" />
          </td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.popularity.toFixed(2) }}</td>
          <td>{{ contact.wonOscar ? '🏆' : '' }}</td>
          <td>{{ contact.wonEmmy ? '🏆' : '' }}</td>
          <td>
            <button class="delete-btn" @click="removeContact(contact.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import contacts from './contacts.json'

const contactsList = ref(contacts.slice(0, 5))

const remainingContacts = computed(() => {
  return contacts.filter(contact => 
    !contactsList.value.some(c => c.id === contact.id)
  )
})

const addRandomContact = () => {
  if (remainingContacts.value.length === 0) return
  const randomIndex = Math.floor(Math.random() * remainingContacts.value.length)
  const randomContact = remainingContacts.value[randomIndex]
  contactsList.value.push(randomContact)
}

const sortByName = () => {
  contactsList.value.sort((a, b) => a.name.localeCompare(b.name))
}

const sortByPopularity = () => {
  contactsList.value.sort((a, b) => b.popularity - a.popularity)
}

const removeContact = (id) => {
  contactsList.value = contactsList.value.filter(contact => contact.id !== id)
}
</script>

<style>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.actions {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

th, td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background-color: #2c3e50;
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.9em;
}

tr:hover {
  background-color: #f5f5f5;
  transition: background-color 0.2s ease;
}

img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
}

img:hover {
  transform: scale(1.1);
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  background-color: #3498db;
  color: white;
}

button:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

button:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.delete-btn {
  background-color: #e74c3c;
  padding: 8px 15px;
  font-size: 0.9em;
}

.delete-btn:hover {
  background-color: #c0392b;
}


td:nth-child(4), td:nth-child(5) {
  font-size: 1.2em;
}


@media (max-width: 768px) {
  .actions {
    flex-direction: column;
  }
  
  table {
    font-size: 0.9em;
  }
  
  th, td {
    padding: 10px;
  }
  
  img {
    width: 40px;
    height: 40px;
  }
}
</style>