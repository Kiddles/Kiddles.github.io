import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
    /*{
        path: '/',
        redirect: '/index'
    },*/
        {
            path: '/index',
            component: resolve => require(['../components/page/index.vue'], resolve),

        },
        {
            path: '/myTime',
            component: resolve => require(['../components/page/myTime.vue'], resolve),

        },
         {
            path: '/myTree',
            component: resolve => require(['../components/page/myTree.vue'], resolve),

        },
    ]
})
