import { createApp } from 'vue'
import App from './App.vue'
import { VueFire } from 'vuefire'
import { firebaseApp } from './firebase'
import { createMemoryHistory, createRouter } from 'vue-router'
import HomeComponent from './components/Home'

const routes = [{ path: '/', component: HomeComponent }]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

const app = createApp(App)

app.use(router)
app.use(VueFire, { firebaseApp })
app.mount('#app')
