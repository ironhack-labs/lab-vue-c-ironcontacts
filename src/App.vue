<script setup>
import { useContactsStore } from "./store/store.js";
import { ref, computed } from "vue";
const contactsStore = useContactsStore();

const contacts = ref([]);
const sortBy = ref(null);

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



fetch('/src/contacts.json')
  .then(response => response.json())
  .then(data => {
    contacts.value = data.slice(0, 5);
  })
  .catch(error => {
    console.error('An error occurred while retrieving contacts:', error);
  });

</script>
  

<template>
  <div>
    <h1>Contacts</h1>
    <div>
      <button @click="sortByName">Sort by Name</button>
      <button @click="sortByPopularity">Sort by Popularity</button>
    </div>
    <table>
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
          <td><img :src="contact.pictureUrl" alt="Contact Picture" style="width: 100px; height: 100px;"></td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.popularity }}</td>
          <td>{{ contact.wonOscar ? '🏆' : '' }}</td>
          <td>{{ contact.wonEmmy ? '🏆' : '' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<style></style>