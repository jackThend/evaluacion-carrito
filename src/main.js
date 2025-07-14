// 1. Importar todos los estilos PRIMERO
import 'bootstrap/dist/css/bootstrap.css';
import './assets/main.css';

// 2. Importar Vue y el componente principal
import { createApp } from 'vue';
import App from './App.vue';

// 3. Crear y montar la aplicación
createApp(App).mount('#app');