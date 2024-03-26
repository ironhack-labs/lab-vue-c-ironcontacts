<script>
import { ref } from 'vue';
import contactsData from './contacts.json';

export default {
  name: 'App',
  data() {
    const contacts = ref([])
    contacts.value = contactsData.slice(0, 5);
    const remainingContacts = ref([])
    remainingContacts.value = contactsData.filter((contact) => !contacts.value.includes(contact))

    return {
      contacts, remainingContacts
    }
  },
  methods: {
    addRandomContact() {
      this.remainingContacts = this.remainingContacts.filter((contact) => !this.contacts.includes(contact));
      if (this.remainingContacts.length > 0) {
        const randomContact = this.remainingContacts[Math.floor(Math.random() * this.remainingContacts.length)];
        this.contacts.push(randomContact);
        console.log("Contacts remaining: " + this.remainingContacts.length);
        console.log("Random contact: " + randomContact.name);
      }
    },
    sortByName() {
      this.contacts.sort((a, b) => a.name.localeCompare(b.name))
    },
    sortByPopularity() {
      this.contacts.sort((a, b) => b.popularity - a.popularity)
    },
    removeContact(id) {
      this.contacts = this.contacts.filter((contact) => contact.id !== id);
      console.log(this.contacts.length);
    }
  },
}


</script>

<template>
  <h1>Iron Contacts</h1>
  <button @click="addRandomContact">Add Random Contact</button>
  <button @click="sortByName">Sort By Name</button>
  <button @click="sortByPopularity">Sort By Popularity</button>
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
        <td @click="removeContact(contact.id)">❌​</td>
      </tr>
    </tbody>
  </table>
</template>


<style></style>
