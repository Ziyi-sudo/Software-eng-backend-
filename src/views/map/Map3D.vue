<template>
  <div class="map-container">
    <h2>3D 三维地图</h2>
    <p>这里是三维地图的页面，已集成 Mapbox 3D。</p>

    <!-- 3D 地图容器 -->
    <div id="map" class="mapbox-container"></div>

    <!-- 返回首页按钮 -->
    <el-button type="primary" icon="el-icon-arrow-left" @click="goHome">
      返回首页
    </el-button>
  </div>
</template>

<script>
import mapboxgl from "@/utils/mapbox"; // ✅ 从 utils/mapbox.js 导入 Mapbox 配置
import "mapbox-gl/dist/mapbox-gl.css"; // 🚀【必须】引入 Mapbox CSS，确保地图渲染正确

export default {
  name: "Map3D",
  data() {
    return {
      map: null, // 存储 Mapbox 实例
    };
  },
  mounted() {
    console.log("✅ Map3D.vue 组件已加载！");
    this.initMap(); // 初始化 3D 地图
  },
  methods: {
    // 初始化 Mapbox 3D 地图
    initMap() {
      this.map = new mapboxgl.Map({
        container: "map", // 绑定地图的容器 ID
        style: "mapbox://styles/mapbox/satellite-streets-v12", // 🌏 3D 地图风格
        center: [116.4074, 39.9042], // 🌍 设置地图中心（北京）
        zoom: 15, // 🚀 放大级别
        pitch: 60, // 🔥 倾斜角度，3D 效果
        bearing: 20, // 🏙️ 旋转角度
        antialias: true, // 🚀 开启抗锯齿
      });

      this.map.on("load", () => {
        console.log("✅ Mapbox 3D 地图加载完成");

        // ✅ 【添加 3D 建筑图层】
        this.map.addLayer({
          id: "3d-buildings",
          source: "composite",
          "source-layer": "building",
          type: "fill-extrusion",
          minzoom: 14, // 🏙️ 放大到 14 级以上才显示 3D 建筑
          paint: {
            "fill-extrusion-color": "#aaa", // 建筑颜色
            "fill-extrusion-height": ["get", "height"], // 读取建筑高度
            "fill-extrusion-base": ["get", "min_height"], // 读取建筑基准高度
            "fill-extrusion-opacity": 0.7, // 透明度
          },
        });
      });
    },

    goHome() {
      this.$router.push("/home");
    },
  },
  beforeUnmount() {
    if (this.map) {
      this.map.remove(); // 组件销毁时，清除地图实例
    }
  },
};
</script>

<style scoped>
.map-container {
  text-align: center;
  padding: 20px;
}
h2 {
  color: #28a745;
}
p {
  font-size: 16px;
  color: #666;
}

/* ✅ 关键：修正 3D 地图的容器样式 */
.mapbox-container {
  width: 100%;
  height: 600px; /* 🚀 确保地图高度足够，不然看不到 */
  margin: 20px auto;
  border: 1px solid #ccc;
  border-radius: 8px;
}

/* 按钮样式 */
.el-button {
  margin-top: 20px;
  font-size: 16px;
}
</style>