<script setup>
import {
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-vue-next'

defineProps({
  title: String,
  value: String,
  subtitle: String,
  change: String,
  positive: Boolean,
  icon: Object
})
</script>

<template>
  <div class="stat-card">

    <div class="stat-card-top">

      <div class="stat-icon">
        <component
          :is="icon"
          :size="20"
        />
      </div>

      <span
        v-if="change"
        class="stat-change"
        :class="positive ? 'positive' : 'negative'"
      >
        <ArrowUpRight
          v-if="positive"
          :size="14"
        />

        <ArrowDownRight
          v-else
          :size="14"
        />

        {{ change }}
      </span>

    </div>

    <div class="stat-content">

      <span class="stat-title">
        {{ title }}
      </span>

      <h3>
        {{ value }}
      </h3>

      <span class="stat-subtitle">
        {{ subtitle }}
      </span>

    </div>

  </div>
</template>