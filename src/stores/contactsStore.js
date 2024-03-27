import { defineStore } from "pinia";
import { fetchContacts } from "@/api/contactsApi";

export const useContactsStore = defineStore("contacts", {
  id: "contacts",
  // State
  state: () => ({
    contacts: [],
    error: null,
  }),
  // Getters
  getters: {
    // Reordenaciones, etc.
    firstFiveNames(state) {
      return state.contacts.slice(0, 5)
    },
  },
  // Actions
  actions: {
    async loadContacts() {
      this.error = null;
      try {
        const data = await fetchContacts();
        this.contacts = data;
      } catch (error) {
        this.error = error.message;
        console.error("Error fetching contacts:", error);
      }
    },
  },
});
