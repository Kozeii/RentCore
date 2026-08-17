<script setup>
import {
  Line
} from 'vue-chartjs'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
)

const data = {
  labels: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug'
  ],

  datasets: [
    {
      label: 'Revenue',
      data: [
        42000,
        46000,
        49000,
        53000,
        51000,
        58000,
        62000,
        68000
      ],

      borderColor: '#215E61',

      backgroundColor: 'rgba(33, 94, 97, 0.08)',

      borderWidth: 2,

      fill: true,

      tension: 0.4,

      pointRadius: 0,

      pointHoverRadius: 5
    }
  ]
}

const options = {
  responsive: true,

  maintainAspectRatio: false,

  plugins: {
    legend: {
      display: false
    },

    tooltip: {
      backgroundColor: '#1D2128',
      padding: 12,
      displayColors: false
    }
  },

  scales: {
    x: {
      grid: {
        display: false
      },

      border: {
        display: false
      }
    },

    y: {
      border: {
        display: false
      },

      grid: {
        color: '#E7E7E7'
      },

      ticks: {
        callback(value) {
          return '₱' + value / 1000 + 'k'
        }
      }
    }
  }
}
</script>

<template>
  <div class="chart-container">

    <Line
      :data="data"
      :options="options"
    />

  </div>
</template>