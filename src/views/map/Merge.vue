<template>
  <div class="map-container">
    <h2>二三维地图联动</h2>
    <p>这里是二三维地图的联动页面，已集成 Mapbox 2D 和 3D。</p>

    <div class="map-wrapper">
      <!-- 左侧 2D 地图 -->
      <div id="map2D" class="mapbox-container"></div>
      <!-- 右侧 3D 地图 -->
      <div id="map3D" class="mapbox-container"></div>
    </div>

    <!-- 按钮组 -->
    <div class="button-group">
      <el-button type="primary" @click="enableDistanceMeasurement">测距工具</el-button>
      <el-button type="success" @click="toggle3DBuildings">切换 3D 建筑</el-button>
      <el-button type="info" @click="getCurrentLocation">获取当前坐标</el-button>
      <el-button type="warning" @click="getRoute">路径规划</el-button>
      <el-button type="danger" @click="addMarker">添加地标</el-button>
      <el-button type="danger" @click="clearMarkers">清空地标</el-button>
      <el-button type="success" @click="playVideo">播放视频</el-button>
      <el-button type="primary" icon="el-icon-arrow-left" @click="goHome">返回首页</el-button>
    </div>
  </div>
</template>

<script>
import mapboxgl from "@/utils/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

export default {
  name: "Merge",
  data() {
    return {
      map2D: null,
      map3D: null,
      distanceMode: false,
      distanceMarkers: [],
      distanceCoords: [],
      markers: [], // 存储地标
    };
  },
  mounted() {
    console.log("🟢 二三维地图联动组件挂载");
    this.initMaps();
  },
  methods: {
    // ✅ 初始化地图
    initMaps() {
      this.map2D = new mapboxgl.Map({
        container: "map2D",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [116.4074, 39.9042], // 北京坐标
        zoom: 10,
      });

      this.map3D = new mapboxgl.Map({
        container: "map3D",
        style: "mapbox://styles/mapbox/satellite-streets-v12",
        center: [116.4074, 39.9042],
        zoom: 15,
        pitch: 60,
        bearing: 20,
      });

      this.syncMaps(this.map2D, this.map3D);
      this.syncMaps(this.map3D, this.map2D);

      this.map2D.on("click", this.onMapClick);
    },

    // ✅ 联动 2D 和 3D 地图
    syncMaps(source, target) {
      source.on("move", () => {
        target.jumpTo({
          center: source.getCenter(),
          zoom: source.getZoom(),
          bearing: source.getBearing(),
          pitch: source.getPitch(),
        });
      });
    },

    // ✅ 处理地图点击事件
    onMapClick(e) {
      if (this.distanceMode) {
        this.distanceCoords.push([e.lngLat.lng, e.lngLat.lat]);
        const marker = new mapboxgl.Marker().setLngLat(e.lngLat).addTo(this.map2D);
        this.distanceMarkers.push(marker);
      } else {
        alert(`坐标: ${e.lngLat.lng}, ${e.lngLat.lat}`);
      }
    },

    // ✅ 播放视频（修正路径）
    playVideo() {
      if (!this.map2D) return;

      const videoUrl = "/static/videos/Beijing.mp4"; // 访问 public 目录下的视频

      new mapboxgl.Popup({ closeOnClick: true })
          .setLngLat([116.4074, 39.9042]) // 这里可以改成你想要的地图坐标
          .setHTML(`
          <div style="width: 480px; text-align: center;">
            <video width="320" height="240" controls>
              <source src="${videoUrl}" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>
        `)
          .addTo(this.map2D);
    },

    // ✅ 测距功能
    enableDistanceMeasurement() {
      this.distanceMode = !this.distanceMode;
      if (!this.distanceMode) {
        this.calculateDistance();
      }
    },

    // ✅ 计算两点间距离
    calculateDistance() {
      if (this.distanceCoords.length < 2) return;
      let totalDistance = 0;
      for (let i = 0; i < this.distanceCoords.length - 1; i++) {
        const from = this.distanceCoords[i];
        const to = this.distanceCoords[i + 1];
        const R = 6371e3; // 地球半径
        const φ1 = (from[1] * Math.PI) / 180;
        const φ2 = (to[1] * Math.PI) / 180;
        const Δφ = ((to[1] - from[1]) * Math.PI) / 180;
        const Δλ = ((to[0] - from[0]) * Math.PI) / 180;
        const a =
            Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        totalDistance += R * c;
      }
      alert(`总距离: ${(totalDistance / 1000).toFixed(2)} km`);
      this.distanceCoords = [];
      this.distanceMarkers.forEach((m) => m.remove());
    },

    // ✅ 切换 3D 建筑
    toggle3DBuildings() {
      const buildings = this.map3D.getLayer("3d-buildings");
      if (buildings) {
        this.map3D.removeLayer("3d-buildings");
      } else {
        this.map3D.addLayer({
          id: "3d-buildings",
          source: "composite",
          "source-layer": "building",
          type: "fill-extrusion",
          minzoom: 14,
          paint: {
            "fill-extrusion-color": "#aaa",
            "fill-extrusion-height": ["get", "height"],
            "fill-extrusion-base": ["get", "min_height"],
            "fill-extrusion-opacity": 0.7,
          },
        });
      }
    },

    // ✅ 获取当前坐标
    getCurrentLocation() {
      navigator.geolocation.getCurrentPosition((position) => {
        alert(`您的位置: 经度 ${position.coords.longitude}, 纬度 ${position.coords.latitude}`);
      });
    },

    // ✅ 添加地标
    addMarker() {
      const center = this.map2D.getCenter();
      const marker = new mapboxgl.Marker().setLngLat(center).addTo(this.map2D);
      this.markers.push(marker);
    },

    // ✅ 清空所有地标
    clearMarkers() {
      this.markers.forEach((m) => m.remove());
      this.markers = [];
    },

    // ✅ 预设相机位置（复位）
    resetCamera() {
      this.map2D.flyTo({ center: [116.4074, 39.9042], zoom: 10 });
      this.map3D.flyTo({ center: [116.4074, 39.9042], zoom: 15 });
    },

    // ✅ 路径规划（目前只是个提示）
    getRoute() {
      alert("路径规划功能开发中...");
    },


    // ✅ 返回首页
    goHome() {
      this.$router.push("/home");
    },
  },
  beforeDestroy() {
    if (this.map2D) this.map2D.remove();
    if (this.map3D) this.map3D.remove();
  },
};
</script>

<style scoped>
.map-container {
  text-align: center;
  padding: 20px;
}
.map-wrapper {
  display: flex;
  justify-content: space-between;
}
.mapbox-container {
  width: 49%;
  height: 500px;
}
.button-group {
  margin-top: 20px;
}
.el-button {
  margin: 5px;
}
</style>