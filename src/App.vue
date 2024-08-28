<template>
  <div id="app">
    <h1>IronContacts</h1>
    <div class="button-group">
      <button @click="addRandomContact">Add Random Contact</button>
      <button @click="sortByPopularity">Sort by popularity</button>
      <button @click="sortByName">Sort by name</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won an Oscar</th>
          <th>Won an Emmy</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in displayedContacts" :key="contact.id">
          <td>
            <img
              :src="contact.pictureUrl"
              alt="Contact Picture"
              class="pictureUrl"
            />
          </td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.popularity }}</td>
          <td><span v-if="contact.wonOscar"></span></td>
          <td><span v-if="contact.wonEmmy"></span></td>
          <td><button @click="deleteContact(contact.id)">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import contacts from "./contacts.json";

export default {
  name: "App",
  data() {
    return {
      contacts: contacts,
      displayedContacts: contacts.slice(5, 10), // Initial 5 contacts
    };
  },
  methods: {
    addRandomContact() {
      if (this.displayedContacts.length > 0) {
        // Remove a random contact from displayed list
        const randomIndexToRemove = Math.floor(
          Math.random() * this.displayedContacts.length
        );
        this.displayedContacts.splice(randomIndexToRemove, 1);

        // Get remaining contacts (including previously removed ones)
        const remainingContacts = this.contacts;

        if (remainingContacts.length > 0) {
          // Select a random contact from the entire list
          const randomIndexToAdd = Math.floor(
            Math.random() * remainingContacts.length
          );
          const randomContact = remainingContacts[randomIndexToAdd];

          // Add the new random contact to displayed list
          this.displayedContacts.push(randomContact);
          console.log(randomContact);
        }
      }
    },
    sortByName() {
      this.displayedContacts.sort((a, b) => a.name.localeCompare(b.name));
    },
    sortByPopularity() {
      this.displayedContacts.sort((a, b) => b.popularity - a.popularity);
    },
    deleteContact(contactId) {
      this.displayedContacts = this.displayedContacts.filter(
        (contact) => contact.id !== contactId
      );
    },
  },
};
</script>
<style scoped>
#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
h1 {
  font-size: 30px;
  text-align: center;
  margin-bottom: 20px;
}
table {
  width: 70%;
  border-collapse: collapse;
}
table th {
  font-size: 25px;
}
table tbody {
  text-align: center;
}
th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}
td {
  font-size: 20px;
}
.pictureUrl {
  width: 120px;
  height: 120px;
}
.button-group {
  display: flex;
  justify-content: space-between;
  gap: 15px;
}
button {
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 15px;
  background: goldenrod;
  color: white;
  border: none;
  font-weight: bold;
  border-radius: 5px;
}
button:hover {
  cursor: pointer;
  transform: scale(1.01);
  transition: 0.5s ease;
}
</style>
