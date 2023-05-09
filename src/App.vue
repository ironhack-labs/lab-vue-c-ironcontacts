<template>
  <div class="wrapper">
    <table>
      <thead>
        <tr>
          <th colspan="6">IronContacts</th>
        </tr>
        <div class="btn-wrapper">
          <button class="btn" colspan="2" @click="addRandomContact">
            Add Random Contact
          </button>
          <button class="btn" colspan="2" @click="sortByName">Sort by Name</button>
          <button class="btn" colspan="2" @click="sortByPopularity">
            Sort by Popularity
          </button>
        </div>

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
        <tr v-for="(contact, index) in contacts" :key="index">
          <td>
            <img class="img" :src="contact.pictureUrl" :alt="contact.name" />
          </td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.popularity }}</td>
          <td v-if="contact.wonOscar"><i class="fas fa-trophy"></i></td>
          <td v-else></td>
          <td v-if="contact.wonEmmy"><i class="fas fa-star"></i></td>
          <td v-else></td>
          <td>
            <button class="btn" @click="removeContact(contact.id)">
              Delete
            </button>
          </td>
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
      contacts: [],
    };
  },

  methods: {
    addRandomContact() {
      const remainingContacts = contacts.filter(
        (contact) => !this.contacts.includes(contact)
      );
      const newContact =
        remainingContacts[Math.floor(Math.random() * remainingContacts.length)];
      this.contacts.push(newContact);
    },

    removeContact(id) {
      const index = this.contacts.findIndex((contact) => contact.id === id);
      if (index !== -1) {
        this.contacts.splice(index, 1);
      }
    },

    sortByName() {
      this.contacts.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });
    },
    sortByPopularity() {
      this.contacts.sort((a, b) => b.popularity - a.popularity);
    },
  },

  created() {
    this.contacts = contacts.slice(0, 5);
  },
};
</script>

<style>
.wrapper {
  max-width: 800px;
  margin: 0 auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

thead tr th,
tbody tr td {
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #ccc;
}

thead tr th {
  background-color: #eee;
}

th[colspan="5"] {
  text-align: center;
  padding: 20px;
}

.img {
  width: 100px;
}
.btn-wrapper {
  display: flex;
  justify-content: center;
}
.btn {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background-color: #0074d9;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
}

.btn:hover {
  background-color: #0063aa;
}

.fa-trophy,
.fa-star {
  color: gold;
}

.delete-btn {
  background-color: #e74c3c;
}

.delete-btn:hover {
  background-color: #c0392b;
}
</style>
