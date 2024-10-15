import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'

console.log(`.env file read Here\`s api_key_example - ${import.meta.env.VITE_EXAMPLE_API_ENDPOINT}`)
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/:countryCode',
            name: 'country',
            component: () => import('../views/CountryView.vue')
        }
    ]
})

export default router
