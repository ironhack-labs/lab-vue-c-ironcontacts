
<script setup>
  import { ref } from 'vue'
  import contacts from "./contacts.json"

  // Crear variable con los contactos que esten en DB pero no en selectedContacs
  // Seleccionar un contacto aleatoreamente de los restantes en el array nuevo creado
  // Meterlo en el array de selectedContacts
  // Validamos errores


  const selectedContacts = ref(contacts.slice(0, 5))

  const addContact = () => {
    const contactosRestantes = contacts.filter((contact) => !selectedContacts.value.includes(contact))
    if(contactosRestantes.length > 0) {
      const randomIndex = Math.floor(Math.random()*contactosRestantes.length)
  
      const contactoAgregar = contactosRestantes[randomIndex]
  
      selectedContacts.value.splice(0, 0, contactoAgregar)
  
      console.log(contactosRestantes.length)

    } else {
      console.error('No hay mas contactos en base de datos')
    }
  }

  const orderByName = () => {
    // usar funcion sort
    selectedContacts.value.sort((a, b) => a.name.localeCompare(b.name))
    console.log(selectedContacts)

  }

  const orderByPopularity = () => {
    // usar funcion sort
    selectedContacts.value.sort((a, b) => b.popularity - a.popularity)

  }

  const deleteContact = (id) => {
    const indiceEncontrado = selectedContacts.value.findIndex((contact) => contact.id === id )
    selectedContacts.value.splice(indiceEncontrado, 1)

  }


    const inputText = ref('')
    const list = ref([])
    
    
    const savedText = () => {
      list.value.push(inputText.value)
      inputText.value = ''
      
    }
    


</script>

<template>

<div>
    <input @keydown.enter="savedText" v-model="inputText" data-testid="add-item" placeholder="add item"/>
    <button data-testid="sort-direction">⬇️</button>
    <button data-testid="clear-list">CL</button>
    <ul data-testid="items-list">
      <li v-for="(text, index) in list" :key="index">{{text}}</li>
    </ul>
  </div>

  <h1>IronContacts</h1>
  <button @click="addContact">Add random contact</button>
  <button @click="orderByName">Order By Name</button>
  <button @click="orderByPopularity">Order By Popularity</button>
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
      <tr v-for="contact in selectedContacts" :key="contact.id">
        <td>
          <img :src="contact.pictureUrl" alt="">
        </td>
        <td>
          {{ contact.name}}
        </td>
        <td>
          {{ Math.round((contact.popularity + Number.EPSILON) * 100) / 100 }}
        </td>        
        <td v-if="contact.wonOscar">
          🏆
        </td>
        <td v-else>
          -
        </td>
        <td v-if="contact.wonEmmy">
          🏆
        </td>
        <td v-else>
          -
        </td>
        <td>
          <button @click="deleteContact(contact.id)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>

</template>

<style>
  img {
    width: 5rem;
  }
</style>
