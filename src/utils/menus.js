import { getRequest } from "./api";

export const initMenu = (router, store) => {
    if (store.state.routes.length > 0) {
        console.log("✅ 已有菜单数据，无需重新加载");
        return;
    }

    console.log("🔍 发送请求，获取菜单数据...");
    getRequest("/system/menu/tree").then(data => {
        console.log("🔍 后端返回的菜单数据:", data);  // 🔥 确保 `/gas` 存在
        if (data && Array.isArray(data)) {
            let fmtRoutes = formatRoutes(data);
            console.log("✅ 格式化后的路由:", fmtRoutes);  // 🔥 确保 `component` 解析成功

            // ✅ Vue Router 4 使用 addRoute() 代替 addRoutes()
            fmtRoutes.forEach(route => {
                router.addRoute(route);
            });

            store.commit('initRoutes', fmtRoutes);
            store.dispatch('connect');
        } else {
            console.error("❌ 获取的菜单数据格式错误:", data);
        }
    }).catch(error => {
        console.error("❌ 获取菜单数据失败:", error);
    });
};

export const formatRoutes = (routes) => {
    let fmRoutes = [];

    routes.forEach(route => {
        let { path, component, name, meta, iconCls, children } = route;

        if (!component) {
            console.warn(`⚠️ 菜单 [${name}] 组件为空，跳过！`);
            return;
        }

        console.log(`📌 解析菜单组件: ${component}`); // 🔥 确保 `component` 是 `Gas` 或 `Inspection`

        // 🔥 修正 children 为空时的错误
        if (children && Array.isArray(children) && children.length > 0) {
            children = formatRoutes(children);
        } else {
            children = [];
        }

        let fmRouter = {
            path: path,
            name: name,
            iconCls: iconCls,
            meta: meta,
            children: children,
            component: resolve => {
                console.log("📌 加载组件:", component);  // 🔥 这里应该打印 `Gas.vue` 或 `Inspection.vue`
                try {
                    if (component === "Home" && name === "天然气站场三维可视化信息系统") {
                        require(['../views/gas/Gas.vue'], resolve);  // ✅ 让 `Gas.vue` 仍然被正确解析
                    }else if (component === "Home" && name === "二维地图展示") {
                        require(['../views/map/Map2D.vue'], resolve);  // ✅ 让 `Map2D.vue` 正确解析
                    } else if (component === "Home" && name === "三维地图展示") {
                        require(['../views/map/Map3D.vue'], resolve);  // ✅ 让 `Map3D.vue` 正确解析
                    }  else if (component.startsWith("Home")) {
                        require(['../views/' + component + '.vue'], resolve);
                    } else if (component.startsWith("Emp")) {
                        require(['../views/emp/' + component + '.vue'], resolve);
                    } else if (component.startsWith("Per")) {
                        require(['../views/per/' + component + '.vue'], resolve);
                    } else if (component.startsWith("Sal")) {
                        require(['../views/sal/' + component + '.vue'], resolve);
                    } else if (component.startsWith("Sta")) {
                        require(['../views/sta/' + component + '.vue'], resolve);
                    } else if (component.startsWith("Sys")) {
                        require(['../views/sys/' + component + '.vue'], resolve);
                    } else if (component.startsWith("Gas") || [
                        "Gas", "Inspection", "Equipment", "Monitoring",
                        "Documents", "Materials", "Response",
                        "Risk", "Warning"
                    ].includes(component)) {
                        require(['../views/gas/' + component + '.vue'], resolve);
                    } else {
                        console.warn("⚠️ 未知组件路径:", component);
                    }
                } catch (e) {
                    console.error("❌ 组件加载失败！", e);
                }
            }
        };

        fmRoutes.push(fmRouter);
    });

    return fmRoutes;
};
