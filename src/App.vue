<script setup>
import { useContactsStore } from "./store/store.js";
import { ref, computed } from "vue";
const contactsStore = useContactsStore();

const contacts = ref([]);
const sortBy = ref(null);
const remainingContacts = ref([]);
const contactsToShow = ref([]);

const sortByName = () => {
  sortBy.value = 'name';
};

const sortByPopularity = () => {
  sortBy.value = 'popularity';
};

const sortedContacts = computed(() => {
  if (sortBy.value === 'name') {
    return contacts.value.slice().sort((a, b) => a.name.localeCompare(b.name));
  }
  if (sortBy.value === 'popularity') {
    return contacts.value.slice().sort((a, b) => b.popularity - a.popularity);
  }
  return contacts.value;
});

const addRandomContact = () => {
  // Initialize remainingContacts if empty or reset it if all contacts are displayed
  if (remainingContacts.value.length === 0) {
    remainingContacts.value = contacts.value.filter(contact => !contactsToShow.value.includes(contact));
    shuffleArray(remainingContacts.value); // Shuffle the remainingContacts array
  }

  // Check if there are remaining contacts to add
  if (remainingContacts.value.length > 0) {
    const randomIndex = Math.floor(Math.random() * remainingContacts.value.length);
    const randomContact = remainingContacts.value.splice(randomIndex, 1)[0]; // Remove the random contact from remainingContacts
    // Add the random contact to contacts
    contacts.value.push(randomContact);
  }
};
// Function to shuffle an array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};
fetch('/src/contacts.json')
  .then(response => response.json())
  .then(data => {
    // Load all contacts into the contacts array
    contacts.value = data;
    // Set the initial display to only five contacts
    contactsToShow.value = contacts.value.slice(0, 5); // Update to set contactsToShow with the first five contacts
    // Update remainingContacts with the remaining contacts
    remainingContacts.value = contacts.value.slice(5);
  })
  .catch(error => {
    console.error('An error occurred while retrieving contacts:', error);
  });
  
</script>


<template>
  <div class="container">
    <h1 class="h1">Contacts</h1>
    <div>
      <button @click="addRandomContact" class="btn btn-outline-primary">Add Random Contact</button>
      <button @click="sortByName" class="btn btn-outline-primary">Sort by Name</button>
      <button @click="sortByPopularity" class="btn btn-outline-primary">Sort by Popularity</button>
    </div>
    <div class="table-responsive"> 
      <table class="container text-center">
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(contact, index) in sortedContacts" :key="index">
            <td class="col-2"><img :src="contact.pictureUrl" alt="Contact Picture" style="width: 100px; height: 100px;"
                class="rounded"></td>
            <td class="col-2">{{ contact.name }}</td>
            <td class="col-2">{{ contact.popularity }}</td>
            <td class="col-2">{{ contact.wonOscar ? '🏆' : '' }}</td>
            <td class="col-2">{{ contact.wonEmmy ? '🏆' : '' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<style scoped>
button {
  margin: 5px;
}

.h1 {
  color: #0d6efd;
}

.rounded {
  margin-bottom: 1rem;
}
</style>