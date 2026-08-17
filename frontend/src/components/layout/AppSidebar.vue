<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const isMobileOpen = ref(false)

const navigation = [
  {
    label: 'Dashboard',
    icon: '⌂',
    to: '/'
  },
  {
    label: 'Properties',
    icon: '▦',
    to: '/properties'
  },
  {
    label: 'Tenants',
    icon: '♙',
    to: '/tenants'
  },
  {
    label: 'Payments',
    icon: '₱',
    to: '/payments'
  },
  {
    label: 'Expenses',
    icon: '↗',
    to: '/expenses'
  },
  {
    label: 'Documents',
    icon: '▤',
    to: '/documents'
  },
  {
    label: 'Reports',
    icon: '▥',
    to: '/reports'
  }
]

const bottomNavigation = [
  {
    label: 'Settings',
    icon: '⚙',
    to: '/settings'
  }
]

function isActive(path) {
  return route.path === path
}

function closeMobile() {
  isMobileOpen.value = false
}
</script>

<template>
  <aside class="app-sidebar">

    <!-- Logo -->
    <div class="sidebar-brand">
      <RouterLink to="/" class="brand-link" @click="closeMobile">
        <div class="brand-mark">
          R
        </div>

        <div class="brand-text">
          <strong>RentCore</strong>
          <span>Property Management</span>
        </div>
      </RouterLink>
    </div>

    <!-- Main Navigation -->
    <nav class="sidebar-navigation">

      <p class="sidebar-section-title">
        MAIN
      </p>

      <RouterLink
        v-for="item in navigation"
        :key="item.to"
        :to="item.to"
        class="sidebar-link"
        :class="{ active: isActive(item.to) }"
        @click="closeMobile"
      >
        <span class="sidebar-icon">
          {{ item.icon }}
        </span>

        <span class="sidebar-label">
          {{ item.label }}
        </span>
      </RouterLink>

    </nav>

    <!-- Bottom Navigation -->
    <div class="sidebar-bottom">

      <p class="sidebar-section-title">
        SYSTEM
      </p>

      <RouterLink
        v-for="item in bottomNavigation"
        :key="item.to"
        :to="item.to"
        class="sidebar-link"
        :class="{ active: isActive(item.to) }"
        @click="closeMobile"
      >
        <span class="sidebar-icon">
          {{ item.icon }}
        </span>

        <span class="sidebar-label">
          {{ item.label }}
        </span>
      </RouterLink>

      <!-- User -->
      <div class="sidebar-user">

        <div class="user-avatar">
          KC
        </div>

        <div class="user-information">
          <strong>Admin</strong>
          <span>Property Owner</span>
        </div>

        <button
          class="user-menu-button"
          type="button"
          title="User menu"
        >
          ⋮
        </button>

      </div>

    </div>

  </aside>
</template>

<style scoped>
.app-sidebar {
  width: 250px;
  min-width: 250px;
  height: 100vh;

  display: flex;
  flex-direction: column;

  background: #215E61;
  color: #F5F5F5;

  border-right: 1px solid rgba(255, 255, 255, 0.08);

  position: sticky;
  top: 0;
  left: 0;

  z-index: 100;
}

/* BRAND */

.sidebar-brand {
  height: 76px;

  display: flex;
  align-items: center;

  padding: 0 20px;

  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.brand-link {
  width: 100%;

  display: flex;
  align-items: center;

  gap: 12px;

  color: #F5F5F5;
  text-decoration: none;
}

.brand-mark {
  width: 38px;
  height: 38px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;

  background: #FF9E20;
  color: #1D2128;

  font-size: 18px;
  font-weight: 800;
}

.brand-text {
  display: flex;
  flex-direction: column;

  min-width: 0;
}

.brand-text strong {
  font-size: 16px;
  line-height: 20px;

  font-weight: 700;
}

.brand-text span {
  font-size: 10px;
  line-height: 15px;

  opacity: 0.65;

  white-space: nowrap;
}

/* NAVIGATION */

.sidebar-navigation {
  flex: 1;

  padding: 24px 14px 12px;

  overflow-y: auto;
}

.sidebar-section-title {
  margin: 0 10px 10px;

  font-size: 10px;
  font-weight: 700;

  letter-spacing: 0.08em;

  color: rgba(245, 245, 245, 0.5);
}

.sidebar-link {
  width: 100%;
  min-height: 44px;

  display: flex;
  align-items: center;

  gap: 12px;

  padding: 0 12px;

  margin-bottom: 4px;

  border-radius: 9px;

  color: rgba(245, 245, 245, 0.72);

  text-decoration: none;

  font-size: 13px;
  font-weight: 500;

  transition:
    background 0.18s ease,
    color 0.18s ease,
    transform 0.18s ease;
}

.sidebar-link:hover {
  background: rgba(255, 255, 255, 0.09);
  color: #F5F5F5;

  transform: translateX(2px);
}

.sidebar-link.active {
  background: #FF9E20;
  color: #1D2128;

  font-weight: 700;
}

.sidebar-link.active:hover {
  background: #FF9E20;
  color: #1D2128;
}

.sidebar-icon {
  width: 22px;
  min-width: 22px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 16px;
  font-weight: 600;
}

.sidebar-label {
  white-space: nowrap;
}

/* BOTTOM */

.sidebar-bottom {
  padding: 14px;

  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

/* USER */

.sidebar-user {
  display: flex;
  align-items: center;

  gap: 10px;

  margin-top: 14px;
  padding: 10px;

  border-radius: 10px;

  background: rgba(255, 255, 255, 0.06);
}

.user-avatar {
  width: 34px;
  height: 34px;

  min-width: 34px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 9px;

  background: #F5F5F5;
  color: #215E61;

  font-size: 11px;
  font-weight: 800;
}

.user-information {
  flex: 1;

  min-width: 0;

  display: flex;
  flex-direction: column;
}

.user-information strong {
  font-size: 12px;
  font-weight: 700;

  color: #F5F5F5;
}

.user-information span {
  font-size: 10px;

  color: rgba(245, 245, 245, 0.55);
}

.user-menu-button {
  width: 28px;
  height: 28px;

  border: 0;
  border-radius: 7px;

  background: transparent;

  color: rgba(245, 245, 245, 0.6);

  cursor: pointer;
}

.user-menu-button:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #F5F5F5;
}

/* RESPONSIVE */

@media (max-width: 900px) {
  .app-sidebar {
    width: 220px;
    min-width: 220px;
  }
}

@media (max-width: 700px) {
  .app-sidebar {
    width: 220px;
    min-width: 220px;
  }

  .brand-text span {
    display: none;
  }
}
</style>