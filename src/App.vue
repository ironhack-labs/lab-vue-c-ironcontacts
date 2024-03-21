<template>
  <div>
    <h1>{{ title }}</h1>
    <div class="button-container">
      <button @click="addRandomContact">Add Random Contact</button>
      <button @click="sortByPopularity">Sort By Popularity</button>
      <button @click="sortByName">Sort By Name</button>
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
        <tr v-for="contact in contacts" :key="contact.id">
          <contact-item :contact="contact" @delete="deleteContact(contact.id)" />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import contacts from './contacts.json';
import ContactItem from './components/tableContacts.vue';

export default {
  name: 'App',
  components: {
    ContactItem
  },
  data() {
    return {
      title: 'IronContacts',
      contacts: [],
      remainingContacts: [],
      sortOrder: 'desc',
      sortByField: ''
    };
  },
  mounted() {
    this.contacts = contacts.slice(0, 5);
    this.remainingContacts = contacts.slice(5);
  },
  methods: {
    addRandomContact() {
      if (this.remainingContacts.length === 0) {
        alert('No hay más contactos disponibles.');
        return;
      }
      const randomIndex = Math.floor(Math.random() * this.remainingContacts.length);
      const newContact = this.remainingContacts.splice(randomIndex, 1)[0];
      this.contacts.push(newContact);
    },
    sortByPopularity() {
      if (this.sortOrder === 'asc') {
        this.contacts.sort((a, b) => a.popularity - b.popularity);
        this.sortOrder = 'desc';
      } else {
        this.contacts.sort((a, b) => b.popularity - a.popularity);
        this.sortOrder = 'asc';
      }
    },
    sortByName() {
      if (this.sortOrder === 'asc') {
        this.contacts.sort((a, b) => a.name.localeCompare(b.name));
        this.sortOrder = 'desc';
      } else {
        this.contacts.sort((a, b) => b.name.localeCompare(a.name));
        this.sortOrder = 'asc';
      }
    },
    deleteContact(id) {
      const index = this.contacts.findIndex(contact => contact.id === id);
      if (index !== -1) {
        this.contacts.splice(index, 1);
      }
    }
  }
};
</script>

<style>
h1 {
  font-weight: bold;
  text-align: center;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.button-container button {
  margin-right: 10px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 16px;
  cursor: pointer;
}

.actions-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

table {
  border-collapse: collapse;
  width: 100%;
  margin-top: 20px;
}

th,
td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
  font-size: 18px;
}

td img {
  max-width: 100px;
  height: auto;
}
</style>
