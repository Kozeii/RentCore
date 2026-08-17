<template>
  <header class="app-header">

    <div class="header-left">

      <button
        class="menu-button"
        type="button"
        @click="$emit('toggle-sidebar')"
        aria-label="Toggle sidebar"
      >
        <svg
          width="21"
          height="21"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        >
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </button>

      <div class="header-heading">
        <h1>Dashboard</h1>
        <p>Overview of your rental properties</p>
      </div>

    </div>


    <div class="header-right">

      <!-- NOTIFICATION -->
      <button
        class="header-icon"
        type="button"
        aria-label="Notifications"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>

        <span class="notification-badge"></span>
      </button>


      <div class="header-line"></div>


      <!-- USER -->
      <button
        class="header-user"
        type="button"
      >

        <div class="header-avatar">
          KO
        </div>

        <div class="header-user-info">
          <strong>Admin</strong>
          <span>Property Owner</span>
        </div>

        <svg
          class="chevron"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>

      </button>

    </div>

  </header>
</template>

<script setup>
defineEmits(['toggle-sidebar'])
</script>