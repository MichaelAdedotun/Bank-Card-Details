import {createRouter, createWebHistory} from "vue-router";
import CardInputForm from "../components/CardInputForm.vue";
import SuccessMessage from "../components/SuccessMessage.vue";

const routes = [
    {
        path: "/",
        component: CardInputForm,
        props: route => ({ modelValue: route.query.modelValue})
    },

    {
        path: "/success",
        component: SuccessMessage,
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
})