import { createRouter, createWebHistory } from 'vue-router'

import DashboardView from '../views/DashboardView.vue'
import PropertiesView from '../views/PropertiesView.vue'
import TenantsView from '../views/TenantsView.vue'
import PaymentsView from '../views/PaymentsView.vue'
import ExpensesView from '../views/ExpensesView.vue'
import DocumentsView from '../views/DocumentsView.vue'
import ReportsView from '../views/ReportsView.vue'
import SettingsView from '../views/SettingsView.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      component: () => import('../layouts/DashboardLayout.vue'),

      children: [
        {
          path: '',
          name: 'dashboard',
          component: DashboardView
        },

        {
          path: 'properties',
          name: 'properties',
          component: PropertiesView
        },

        {
          path: 'tenants',
          name: 'tenants',
          component: TenantsView
        },

        {
          path: 'payments',
          name: 'payments',
          component: PaymentsView
        },

        {
          path: 'expenses',
          name: 'expenses',
          component: ExpensesView
        },

        {
          path: 'documents',
          name: 'documents',
          component: DocumentsView
        },

        {
          path: 'reports',
          name: 'reports',
          component: ReportsView
        },

        {
          path: 'settings',
          name: 'settings',
          component: SettingsView
        }
      ]
    }
  ],

  scrollBehavior() {
    return {
      top: 0
    }
  }
})

export default router