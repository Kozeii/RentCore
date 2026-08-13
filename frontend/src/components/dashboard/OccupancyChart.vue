<script setup>
import {
  Doughnut
} from 'vue-chartjs'

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip
} from 'chart.js'

ChartJS.register(
  ArcElement,
  Tooltip
)

const data = {
  labels: [
    'Occupied',
    'Vacant',
    'Reserved'
  ],

  datasets: [
    {
      data: [
        78,
        15,
        7
      ],

      backgroundColor: [
        '#215E61',
        '#E7E7E7',
        '#FF9E20'
      ],

      borderWidth: 0,

      hoverOffset: 4
    }
  ]
}

const options = {
  responsive: true,

  maintainAspectRatio: false,

  cutout: '72%',

  plugins: {
    legend: {
      display: false
    }
  }
}
</script>

<template>
  <div class="occupancy-chart">

    <div class="donut-wrapper">

      <Doughnut
        :data="data"
        :options="options"
      />

      <div class="donut-center">
        <strong>78%</strong>
        <span>Occupied</span>
      </div>

    </div>

    <div class="occupancy-legend">

      <div>
        <span class="legend-dot occupied"></span>
        <span>Occupied</span>
        <strong>78%</strong>
      </div>

      <div>
        <span class="legend-dot vacant"></span>
        <span>Vacant</span>
        <strong>15%</strong>
      </div>

      <div>
        <span class="legend-dot reserved"></span>
        <span>Reserved</span>
        <strong>7%</strong>
      </div>

    </div>

  </div>
</template>