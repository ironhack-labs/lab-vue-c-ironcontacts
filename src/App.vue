<template>
  <div>
    <h1>{{title}}</h1>
    <table>
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in contacts" :key="contact.id">
          <td><img :src="contact.pictureUrl" alt="contact picture"></td>
          <td>{{ contact.name }}</td>
          <td>{{ contact.popularity.toFixed(2) }}</td>
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
        title: "IronContacts",
        contacts: [],
        remainingContacts: [],
        sortOrder: "desc",
      };
    },
    mounted() {
      this.contacts = contacts.slice(0, 5);
      this.remainingContacts = contacts.slice(5)
    },
    methods: {
    }, 
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
  th, td {
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