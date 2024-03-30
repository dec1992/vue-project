import { createApp } from 'vue'
import App from './App.vue'
import { VueFire } from 'vuefire'
import { firebaseApp } from './firebase'
import { createMemoryHistory, createRouter } from 'vue-router'
import HomeComponent from './components/Home'
import ChatRoom from './components/ChatRoom'

const routes = [{ path: '/', component: HomeComponent, name: 'home' }, {
    path: '/chats/:id', component: ChatRoom, name: 'chat'
}]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

const app = createApp(App)

app.use(router)
app.use(VueFire, { firebaseApp })
app.mount('#app')
