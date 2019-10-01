import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import List from "@/views/List";
import Register from "@/views/Register";

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
        }
    ]
});

export default router;