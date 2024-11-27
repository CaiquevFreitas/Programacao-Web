import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import VueCookies from 'vue-cookies';

createApp(App).use(store).use(router).use(VueCookies).mount('#app')
