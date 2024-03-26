<script>
import { ref } from 'vue';
import contactsData from './contacts.json';

export default {
  name: 'App',
  data() {
    const contacts = ref([])
    contacts.value = contactsData.slice(0, 10);
    return {
      contacts
    }
  },
  methods: {
    addRandomContact() {
      const remainingContacts = contactsData.filter((contact) => !this.contacts.includes(contact));
      if (remainingContacts.length > 0) {
        const randomContact = remainingContacts[Math.floor(Math.random() * remainingContacts.length)];
        this.contacts.push(randomContact);
        console.log("Contacts remaining: " + remainingContacts.length);
        console.log("Random contact: " + randomContact.name);
      }
    },
  },
}


</script>

<template>
  <h1>Iron Contacts</h1>
  <button @click="addRandomContact">Add Random Contact</button>
  <table>
    <thead>
      <tr>
        <th>Picture</th>
        <th>Name</th>
        <th>Popularity</th>
        <th>Won an Oscar</th>
        <th>Won an Emy</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="contact in contacts" :key="contact.id">
        <td><img :src="contact.pictureUrl" style="max-width: 40px;"></td>
        <td>{{ contact.name }}</td>
        <td>{{ contact.popularity.toFixed(2) }}</td>
        <td v-if="contact.wonOscar">🏆</td>
        <td v-else></td>
        <td v-if="contact.wonEmmy">🏆</td>
        <td v-else></td>
      </tr>
    </tbody>
  </table>
</template>


<style></style>
