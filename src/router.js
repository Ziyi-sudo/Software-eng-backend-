import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Home from './views/Home.vue';
import Gas from './views/gas/Gas.vue';  // ✅ 确保 Gas.vue 作为一级菜单

Vue.use(Router);

const router = new Router({
    mode: 'history',  // ✅ 可选，去掉 URL 中的 `#`（如果后端支持）
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login,
            hidden: true
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
            hidden: true,
            meta: {
                roles: ['admin', 'user']
            },
            children: [
                {
                    path: '/chat',
                    name: '在线聊天',
                    component: () => import('./views/chat/FriendChat.vue'), // ✅ 按需加载
                    hidden: true
                },
                {
                    path: '/hrinfo',
                    name: '个人中心',
                    component: () => import('./views/HrInfo.vue'), // ✅ 按需加载
                    hidden: true
                }
            ]
        },
        {
            path: '/gas',  // ✅ 一级菜单（父级）
            name: 'Gas',
            component: Gas,
            meta: {
                title: "天然气站场",
                icon: "fa fa-industry"
            },
            children: [
                { path: 'inspection', name: 'Inspection', component: () => import('./views/gas/Inspection.vue'), meta: { title: "日常巡检" } },
                { path: 'monitoring', name: 'Monitoring', component: () => import('./views/gas/Monitoring.vue'), meta: { title: "数据监控" } },
                { path: 'equipment', name: 'Equipment', component: () => import('./views/gas/Equipment.vue'), meta: { title: "设备管理" } },
                { path: 'documents', name: 'Documents', component: () => import('./views/gas/Documents.vue'), meta: { title: "资料管理" } },
                { path: 'risk', name: 'Risk', component: () => import('./views/gas/Risk.vue'), meta: { title: "风险分析" } },
                { path: 'warning', name: 'Warning', component: () => import('./views/gas/Warning.vue'), meta: { title: "安全预警" } },
                { path: 'materials', name: 'Materials', component: () => import('./views/gas/Materials.vue'), meta: { title: "应急物资" } },
                { path: 'response', name: 'Response', component: () => import('./views/gas/Response.vue'), meta: { title: "应急响应" } }
            ]
        },

        // ✅ 新增 二维地图展示 (Map2D)
        {
            path: '/map/manage/',
            name: 'Map2D',
            component: () => import('./views/map/Map2D.vue'),
            meta: { title: "二维地图展示", icon: "fa fa-map" }
        },
        // ✅ 新增 三维地图展示 (Map3D)
        {
            path: '/map/map3d/',
            name: 'Map3D',
            component: () => import('./views/map/Map3D.vue'),
            meta: { title: "三维地图展示", icon: "fa fa-globe" }
        },


        {
            path: '*',
            redirect: '/home',  // ✅ 让未知路径回到首页
            hidden: true
        }
    ]
});


// ✅ 添加全局前置守卫，防止未登录用户访问
router.beforeEach((to, from, next) => {
    if (to.path === '/') {
        next();
    } else {
        if (window.sessionStorage.getItem("user")) {
            next();
        } else {
            next('/?redirect=' + to.path);
        }
    }
});

export default router;
