<template>
    <section>
      <button @click="addNewRandomContact">Add Random Contact</button>
      <button @click="sortByName">Sort By Name</button>
      <button @click="sortByPopularity">Sort By Popularity</button>
    </section>
  </template>
  
  <script setup>
    // Imports
    import { contactsStore } from '@/stores/contactsStore'

    // Create instance of the contactStore
    const contactInstance = contactsStore()

    // Destructure functions (actions)
    const { addNewRandomContact, sortByName, sortByPopularity } = contactInstance

  
  </script>

  