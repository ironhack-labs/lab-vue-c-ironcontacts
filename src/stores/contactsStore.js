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
    contactsOrderdById(state) {
      return [...state.contacts].sort((a, b) => a.id - b.id);
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
