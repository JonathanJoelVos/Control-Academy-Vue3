import PhosphorVue from 'phosphor-vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router).use(PhosphorVue)

app.mount('#app')
