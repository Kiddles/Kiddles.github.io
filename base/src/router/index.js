import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/',
        component: resolve => require(['../components/common/Home.vue'], resolve),
        children:[
            {
                path: '/home',
                component: resolve => require(['../components/page/home.vue'], resolve)
            },
            {
                path: '/leave',
                component: resolve => require(['../components/page/leave.vue'], resolve)
            },
            {
                path: '/overtime',
                component: resolve => require(['../components/page/overtime.vue'], resolve)
            },
            {
                path: '/record',
                component: resolve => require(['../components/page/record.vue'], resolve)
            },
            {
                path: '/index',
                component: resolve => require(['../components/page/index.vue'], resolve)
            },
            /*{
                path: '/reimburse',
                component: resolve => require(['../components/page/reimburse.vue'], resolve)
            },*/
            {
                path: '/org',
                component: resolve => require(['../components/page/org.vue'], resolve)
            },
            {
                path: '/userInfo',
                component: resolve => require(['../components/page/userInfo.vue'], resolve)
            },
            {
                path: '/role',
                component: resolve => require(['../components/page/role.vue'], resolve)
            },
            {
                path: '/dictionary',
                component: resolve => require(['../components/page/dictionary.vue'], resolve)
            },
            {
                path: '/auth',
                component: resolve => require(['../components/page/auth.vue'], resolve)
            },
            {
                path: '/roleDetail',
                component: resolve => require(['../components/page/roleDetail.vue'], resolve)
            },
            {
                path: '/attendance',
                component: resolve => require(['../components/page/attendance.vue'], resolve)
            },
            {
                path: '/approver',
                component: resolve => require(['../components/page/approver.vue'], resolve)
            },
            {
                path: '/reimburse',
                component: resolve => require(['../components/page/reimburse.vue'], resolve),
                children:[
                        {
                            path: '/hr',
                            component: resolve => require(['../components/page/hr.vue'], resolve),
                            children:[
                               {
                                    path: '/hr',
                                    component: resolve => require(['../components/page/hr/index.vue'], resolve),
                                    children:[
                                        {
                                            path: '/freimburseHistory',
                                            component: resolve => require(['../components/page/hr/freimburseHistory.vue'], resolve),
                                        },
                                        {
                                            path: '/fborrowHistory',
                                            component: resolve => require(['../components/page/hr/fborrowHistory.vue'], resolve),
                                        },
                                        {
                                            path: '/fcashHistory',
                                            component: resolve => require(['../components/page/hr/fcashHistory.vue'], resolve),
                                        },
                                        {
                                            path: '/freimburseExport',
                                            component: resolve => require(['../components/page/hr/freimburseExport.vue'], resolve),
                                        }
                                    ]
                                }
                                
                            ]
                        }
                ]

            }
        ]

    },
    ]
})
