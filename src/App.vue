<script>
import contacts from "./contacts.json";
import { ref } from "vue";

// Define the data for the component, Store the first five displayed contacts in an array

export default {
  data() {
    return {
      allContacts: contacts,
      displayedContacts: contacts.slice(0, 5)
    }
  },
  methods: {
      // Method to add a random contact to the displayed contacts
      addRandomContact() {
      // Get the remaining contacts that are not displayed
      const remainingContacts = this.allContacts.filter(contact => !this.displayedContacts.includes(contact));
      // If there are remaining contacts, add a random one to the displayed contacts
      if (remainingContacts.length > 0) {
        const randomIndex = Math.floor(Math.random() * remainingContacts.length);
        this.displayedContacts.push(remainingContacts[randomIndex]);
      }
    },
    //Sort the displayed contacts by their name
    sortByname() {
     
      this.displayedContacts.sort((a, b) => a.name.localeCompare(b.name));
    },
    // Now sort the displayed contacts by popularity
    sortByPopularity() {

      this.displayedContacts.sort((a, b) => b.popularity - a.popularity);
    },
    // Delete a contact from the displayed contacts
    deleteContact(contact) {
      // Used the filter method to remove the contact 
      this.displayedContacts = this.displayedContacts.filter(c => c.id !== contact.id);
    }
  }
}

</script>

<template>
  
  <div class="container">
    <div class="button-group">
      <!--Buttons to sort ba nyme or popularity, and to add roandom contact-->
      <button @click="addRandomContact" class="btn">Add Random Contact</button>
      <button @click="sortByname" class="btn">Sort by Name</button>
      <button @click="sortByPopularity" class="btn">Sort by Popularity</button>
    </div>
    <!--Table to display the data-->
    <table class="table">
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Oscar Wins</th>
          <th>Emmy Wins</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <!--indexing through the array and displaying trophy symbol on "true"-->
        <tr v-for="(contact, index) in displayedContacts" :key="index">
          <td><img :src="contact.pictureUrl" width="70" height="100" alt="Contact Image"></td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.popularity }}</td>
          <td>
            <i v-if="contact.wonOscar" class="fas fa-trophy"></i>
          </td>
          <td>
            <i v-if="contact.wonEmmy" class="fas fa-trophy"></i>
          </td>
          <td>
            <button @click="deleteContact(contact)" class="delete-btn">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<!--Some styling to make the table and the buttons look nicer-->
<style>
.container {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.button-group {
  margin-bottom: 20px;
}

.btn {
  background-color: #ecd910;
  color: #564e4e;
  padding: 10px 20px;
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn:hover {
  background-color: #f1e727;
}

.table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

th {
  background-color: #f0f0f0;
}

.delete-btn {
  background-color: #e74c3c;
  color: #fff;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.delete-btn:hover {
  background-color: #c0392b;
}
</style>
