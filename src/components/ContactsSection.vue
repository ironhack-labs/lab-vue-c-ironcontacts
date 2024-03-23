<template>
    <table>
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won Oscar</th>
          <th>Won Emmy</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(con, index) in contactsToShow" :key="index">
          <td><img :src="con.pictureUrl" :alt="con.name"></td>
          <td>{{ con.name }}</td>
          <td>{{ con.popularity }}</td>
          <td v-if="con.wonOscar === true">🏆</td>
          <td v-else></td>
          <td v-if="con.wonEmmy === true">⭐</td>
          <td v-else></td>
          <td><button @click="deleteContact(con.id)">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script setup>
    // Imports
    import { contactsStore } from '@/stores/contactsStore'
    import { storeToRefs } from 'pinia'


    // Create instance of the contactStore
    const contactInstance = contactsStore()

    // Destructure variables and functions (actions)
    const { deleteContact } = contactInstance
    const { contactsToShow } = storeToRefs(contactInstance)
  </script>
  
  <style scoped>
    img {
      max-height: 100px;
    }
  </style>
  
  