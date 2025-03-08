<template>
  <div class="inspection-container">
    <h2 class="title">日常巡检</h2>

    <div class="image-grid">
      <div class="image-card" v-for="(image, index) in images" :key="index">
        <img :src="image.src" :alt="image.name" class="inspection-image" />
        <p class="image-name">{{ image.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Inspection",
  data() {
    return {
      images: [
        { src: require('@/assets/inspection/1.jpg'), name: "超声波流量计" },
        { src: require('@/assets/inspection/2.jpg'), name: "电动球阀" },
        { src: require('@/assets/inspection/3.jpg'), name: "孔板流量计" },
        { src: require('@/assets/inspection/4.jpg'), name: "自立式调压阀" },
        { src: require('@/assets/inspection/5.jpg'), name: "破风分离器" },
        { src: require('@/assets/inspection/6.jpg'), name: "过滤分离器" },
        { src: require('@/assets/inspection/7.jpg'), name: "手动球阀" },
        { src: require('@/assets/inspection/8.jpg'), name: "消防箱" },
      ]
    };
  },
  created() {
    console.log("✅ Inspection.vue 组件加载成功！");
  }
};
</script>

<style scoped>
.inspection-container {
  max-width: 1200px;
  margin: auto;
  text-align: center;
  padding: 20px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  justify-content: center;
}

.image-card {
  background: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

.image-card:hover {
  transform: translateY(-5px);
}

.inspection-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.image-name {
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
}
</style>
