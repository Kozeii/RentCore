<script setup>
import {
  CheckCircle2,
  Clock3
} from 'lucide-vue-next'

const payments = [
  {
    tenant: 'Maria Santos',
    unit: 'Unit 204',
    amount: '₱12,500',
    date: 'Aug 12, 2026',
    status: 'Paid'
  },
  {
    tenant: 'James Wilson',
    unit: 'Unit 301',
    amount: '₱15,000',
    date: 'Aug 11, 2026',
    status: 'Paid'
  },
  {
    tenant: 'Ana Cruz',
    unit: 'Unit 102',
    amount: '₱10,500',
    date: 'Aug 10, 2026',
    status: 'Pending'
  },
  {
    tenant: 'Robert Lee',
    unit: 'Unit 405',
    amount: '₱18,000',
    date: 'Aug 09, 2026',
    status: 'Paid'
  }
]
</script>

<template>
  <div class="table-container">

    <div
      v-for="payment in payments"
      :key="payment.tenant"
      class="payment-row"
    >

      <div class="tenant-cell">

        <div class="small-avatar">
          {{ payment.tenant.charAt(0) }}
        </div>

        <div>
          <strong>
            {{ payment.tenant }}
          </strong>

          <span>
            {{ payment.unit }}
          </span>
        </div>

      </div>

      <div class="payment-amount">
        {{ payment.amount }}
      </div>

      <div class="payment-date">
        {{ payment.date }}
      </div>

      <div
        class="payment-status"
        :class="payment.status.toLowerCase()"
      >

        <CheckCircle2
          v-if="payment.status === 'Paid'"
          :size="14"
        />

        <Clock3
          v-else
          :size="14"
        />

        {{ payment.status }}

      </div>

    </div>

  </div>
</template>