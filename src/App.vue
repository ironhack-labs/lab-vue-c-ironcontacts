<script setup>
import TitleComponent from "./components/TitleComponent.vue";
import { useStore } from "./store/store";
import Button from "./components/Button.vue";
import { ref } from "vue";

const { contacts } = useStore();

const getRandonInt = (max) => {
  return Math.floor(Math.random() * max);
};

const contactsForDisplay = ref(contacts.slice(0, 5));
const restContacts = ref(contacts.slice(5));

const addRendom = () => {
  const newValue = restContacts.value[getRandonInt(restContacts.value.length)];
  contactsForDisplay.value.push(newValue);
  restContacts.value = restContacts.value.filter((el) => el.id !== newValue.id);
  console.log(contactsForDisplay.value);
};

const sortByPopularity = () => {
  contactsForDisplay.value.sort((a, b) => b.popularity - a.popularity);
};

const sortByName = () => {
  contactsForDisplay.value.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });
};

const removeContact = (id) => {
  contactsForDisplay.value = contactsForDisplay.value.filter(
    (el) => el.id !== id
  );
};
</script>
<template>
  <section>
    <TitleComponent />
    <div class="buttons">
      <Button :action="addRendom">
        <p>Add Randome Contact</p>
      </Button>
      <Button :action="sortByPopularity">
        <p>Sort by popularity</p>
      </Button>
      <Button :action="sortByName">
        <p>Sort by name</p>
      </Button>
    </div>
    <section>
      <div class="table">
        <table>
          <thead class="table-content">
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won Oscar</th>
            <th>Won Emmy</th>
            <th>Actions</th>
          </thead>
          <tbody>
            <tr class="table-content" v-for="contact in contactsForDisplay">
              <td>
                <img :src="contact.pictureUrl ?? ''" />
              </td>
              <td>{{ contact.name }}</td>
              <td>{{ Math.round(contact.popularity * 100) / 100 }}</td>
              <td>{{ contact.wonOscar ? "🏆" : "" }}</td>
              <td>{{ contact.wonEmmy ? "🌟" : "" }}</td>
              <td>
                <Button :action="removeContact" :itemId="contact.id"
                  >Delete</Button
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
    <div></div>
  </section>
</template>
<style scoped>
.table {
  display: flex;
  justify-content: center;
  text-align: center;
}
th {
  padding: 7px;
}

img {
  width: 75px;
  height: auto;
  padding: 5px;
}
.buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
</style>
