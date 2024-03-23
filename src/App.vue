<template>
  <header>
    <h1>IronContacts</h1>
  </header>
  <section>
    <button @click="addNewRandomContact">Add Random Contact</button>
    <button @click="sortByName">Sort By Name</button>
    <button @click="sortByPopularity">Sort By Popularity</button>
  </section>
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
  // IMPORTS
  import { ref, computed } from 'vue';
  import allContacts from '@/contacts.json'

  // VARIABLES
  const contactsToShow = ref(allContacts.slice(5, 10));

  // COMPUTED VARIABLES

  // Iteration 4: sort by name and popularity
  const contactsByName = computed(() => {
    return contactsToShow.value.sort((a,b) => a.name.localeCompare(b.name))
  })

  const contactsByPopularity = computed(() => {
    return contactsToShow.value.sort((a,b) => b.popularity - a.popularity)
  })

  // FUNCTIONS

  // Iteration 3: Add new random contacts
  const addNewRandomContact = () => {
    const contactsNotShown = ref(allContacts.filter(con => !contactsToShow.value.includes(con)));
    if (contactsNotShown.value.length > 0) {
      const newContact = ref(contactsNotShown.value[Math.floor(Math.random() * contactsNotShown.value.length)])
      contactsToShow.value.push(newContact.value)
    }
    else {
      alert('No more contacts to show. All of them are already displayed')
    }
  }

  // Iteration 4: sort by name and popularity

  const sortByName = () => {
    contactsToShow.value = contactsByName.value
  }

  const sortByPopularity = () => {
    contactsToShow.value = contactsByPopularity.value
  }

  // Iteration 5: Delete contact
  const deleteContact = (idToDelete) => {
    contactsToShow.value = contactsToShow.value.filter(con => con.id !== idToDelete)
  }

</script>

<style scoped>
  img {
    max-height: 100px;
  }
</style>

