import { createRouter, createWebHistory } from "vue-router";

const Start = () => import ('./views/Start.vue')
const Questions = () => import ('./views/Questions.vue')
const Result = () => import ('./views/Result.vue')

const routes = [
    {
        path: '/',
        component: Start
    },
    {
        path: '/questions',
        component: Questions
    },
    {
        path: '/result',
        component: Result
    }
]

export default createRouter({
    history: createWebHistory(),
    routes
})