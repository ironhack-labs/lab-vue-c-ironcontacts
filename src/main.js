import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

// Crea una instancia de la aplicación Vue
const app = createApp(App);

// Crea una instancia de Pinia
const pinia = createPinia();

// Registra Pinia con tu aplicación Vue
app.use(pinia);

// Monta la aplicación
app.mount('#app');
