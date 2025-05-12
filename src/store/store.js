import { defineStore } from "pinia";
import CONTACTS from '../contacts.json';
import { reactive } from "vue";

export const useStore = defineStore('store', () => {
  const contacts = reactive(CONTACTS);
  return { contacts };
})