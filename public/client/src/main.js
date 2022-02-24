
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueChatScroll from 'vue-chat-scroll'
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Select2 from 'v-select2-component';
require("./assets/style.css")

createApp(App).use(store).use(router).use(VueChatScroll).use(VueLoading).use(Select2).mount('#app-chat');

// console.log(process.env.VUE_APP_BOT_ID);