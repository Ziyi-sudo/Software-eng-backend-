<template>
  <div class="home-container">
    <!-- 侧边栏（和 Home.vue 一致） -->
    <el-container>
      <el-aside width="200px">
        <el-menu :default-active="$route.path" router>
          <el-menu-item index="/gas/inspection">
            <i class="fa fa-check-circle"></i>
            <span slot="title">日常巡检</span>
          </el-menu-item>
          <el-menu-item index="/gas/monitoring">
            <i class="fa fa-eye"></i>
            <span slot="title">数据监控</span>
          </el-menu-item>
          <el-menu-item index="/gas/equipment">
            <i class="fa fa-cogs"></i>
            <span slot="title">设备管理</span>
          </el-menu-item>
          <el-menu-item index="/gas/documents">
            <i class="fa fa-file-text"></i>
            <span slot="title">资料管理</span>
          </el-menu-item>
          <el-menu-item index="/gas/risk">
            <i class="fa fa-exclamation-triangle"></i>
            <span slot="title">风险分析</span>
          </el-menu-item>
          <el-menu-item index="/gas/warning">
            <i class="fa fa-bell"></i>
            <span slot="title">安全预警</span>
          </el-menu-item>
          <el-menu-item index="/gas/materials">
            <i class="fa fa-archive"></i>
            <span slot="title">应急物资</span>
          </el-menu-item>
          <el-menu-item index="/gas/response">
            <i class="fa fa-ambulance"></i>
            <span slot="title">应急响应</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <!-- 主内容区域 -->
      <el-main>
        <div class="header">
          <h2>天然气站场三维可视化信息系统</h2>
          <p>这里是天然气站场三维可视化系统的首页，你可以在左侧菜单选择具体的功能。</p>
        </div>

        <!-- 🔙 添加返回首页按钮 -->
        <el-button type="primary" icon="el-icon-back" class="back-home-btn" @click="goHome">
          返回首页
        </el-button>

        <!-- 这里加载子页面 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Gas",
  mounted() {
    console.log("✅ Gas.vue 组件已加载！");
  },
  methods: {
    // 🔙 点击按钮返回首页
    goHome() {
      this.$router.push('/home');
    }
  }
};
</script>

<style scoped>
.home-container {
  display: flex;
  height: 100vh;
}

.el-container {
  width: 100%;
  height: 100%;
}

.el-aside {
  background-color: #faf7f7;
  height: 100%;
  border-right: 1px solid #fbfafa;
}

.el-menu {
  border-right: none;
}

.el-main {
  flex: 1;
  padding: 20px;
}

/* 🔙 返回首页按钮样式 */
.back-home-btn {
  margin-bottom: 15px;
  display: block;
}
</style>
