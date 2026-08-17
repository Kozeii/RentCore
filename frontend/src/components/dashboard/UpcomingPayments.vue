<script setup>
const payments = [
  {
    tenant: 'Daniel Garcia',
    unit: 'Unit 202',
    amount: '₱13,500',
    due: 'Tomorrow'
  },
  {
    tenant: 'Sarah Miller',
    unit: 'Unit 305',
    amount: '₱16,000',
    due: 'Aug 15'
  },
  {
    tenant: 'Michael Tan',
    unit: 'Unit 401',
    amount: '₱14,500',
    due: 'Aug 16'
  }
]
</script>

<template>
  <div class="upcoming-list">

    <div
      v-for="payment in payments"
      :key="payment.tenant"
      class="upcoming-item"
    >

      <div class="small-avatar">
        {{ payment.tenant.charAt(0) }}
      </div>

      <div class="upcoming-info">
        <strong>
          {{ payment.tenant }}
        </strong>

        <span>
          {{ payment.unit }}
        </span>
      </div>

      <div class="upcoming-right">

        <strong>
          {{ payment.amount }}
        </strong>

        <span>
          Due {{ payment.due }}
        </span>

      </div>

    </div>

  </div>
</template>