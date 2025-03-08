<template>
  <div class="map-container">
    <h2>3D 三维地图</h2>
    <p>这里是三维地图的页面，后续将会集成 Mapbox 3D 或其他工具。</p>

    <!-- 返回首页按钮 -->
    <el-button type="primary" icon="el-icon-arrow-left" @click="goHome">
      返回首页
    </el-button>
  </div>
</template>

<script>
export default {
  name: "Map3D",
  mounted() {
    console.log("✅ Map3D.vue 组件已加载！");
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
  color: #28a745;
}
p {
  font-size: 16px;
  color: #666;
}

/* 按钮样式 */
.el-button {
  margin-top: 20px;
  font-size: 16px;
}
</style>
