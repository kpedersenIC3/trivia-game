import { createApp } from 'vue'
import App from './App.vue'
import 'animate.css'
//Import Router and store
import router from './router'
import store from  './store'



createApp(App)
    .use(store)
    .use(router)
    .mount('#app')
