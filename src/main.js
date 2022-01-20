import { createApp } from 'vue'
import App from './App.vue'
import 'animate.css'
//Import Router
import router from './router'


createApp(App)
    .use(router)
    .mount('#app')
