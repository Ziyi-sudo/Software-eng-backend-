<template>
  <div class="map-container">
    <h2>2D 二维地图</h2>
    <p>这里是二维地图的页面，已集成 Mapbox 2D 地图。</p>

    <div id="map"></div>

    <el-button type="primary" icon="el-icon-arrow-left" @click="goHome">
      返回首页
    </el-button>
  </div>
</template>

<script>
import mapboxgl from "@/utils/mapbox";

export default {
  name: "Map2D",
  data() {
    return {
      map: null
    };
  },
  mounted() {
    this.map = new mapboxgl.Map({
      container: "map", // 绑定到 HTML 里的 div
      style: "mapbox://styles/mapbox/streets-v11", // 地图样式，可选 light-v10, dark-v10, satellite-v9
      center: [116.4074, 39.9042], // 北京的经纬度（替换为你的坐标）
      zoom: 10 // 放大级别
    });
  },
  methods: {
    goHome() {
      this.$router.push("/home");
    }
  }
};
</script>

<style scoped>
.map-container {
  text-align: center;
  padding: 20px;
}

h2 {
  color: #007bff;
}

p {
  font-size: 16px;
  color: #666;
}

#map {
  width: 100%;
  height: 500px; /* 确保地图 div 有高度 */
  margin-top: 20px;
}

/* 按钮样式 */
.el-button {
  margin-top: 20px;
  font-size: 16px;
}
</style>