<script setup>
import AppSidebar from '../components/layout/AppSidebar.vue'
import AppHeader from '../components/layout/AppHeader.vue'
</script>

<template>
  <div class="dashboard-layout">

    <AppSidebar />

    <div class="dashboard-main">

      <AppHeader />

      <main class="dashboard-content">
        <RouterView />
      </main>

    </div>

  </div>
</template>

<style scoped>
.dashboard-layout {
  min-height: 100vh;

  display: flex;

  background: #F5F5F5;

  color: #1D2128;
}

.dashboard-main {
  flex: 1;
  min-width: 0;

  display: flex;
  flex-direction: column;

  min-height: 100vh;
}

.dashboard-content {
  flex: 1;

  min-width: 0;

  padding: 28px 30px;

  overflow-x: hidden;
}

@media (max-width: 700px) {
  .dashboard-content {
    padding: 20px 16px;
  }
}
</style>