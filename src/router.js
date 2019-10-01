import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import List from "@/views/List";
import Register from "@/views/Register";
import Login from "@/views/Login";
import Activate from "@/views/Activate";

const router = new Router({
    routes: [
        {
            path: '*',
            redirect: '/'
        },
        {
            path: '/',
            name: 'list',
            component: List
        },
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/activate',
            name: 'activate',
            component: Activate
        }
    ]
});

export default router;