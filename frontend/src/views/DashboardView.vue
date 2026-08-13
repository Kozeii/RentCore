<template>
  <div class="dashboard-page">

    <!-- PAGE HEADER -->
    <div class="dashboard-intro">

      <div>
        <h2>Good morning, Admin</h2>
        <p>
          Here's what's happening with your rental properties today.
        </p>
      </div>

      <button class="primary-button">
        + Add Property
      </button>

    </div>


    <!-- STAT CARDS -->
    <section class="stats-grid">

      <div class="stat-card">

        <div class="stat-top">
          <span>Total Properties</span>

          <div class="stat-icon blue">
            🏢
          </div>
        </div>

        <strong>12</strong>

        <p>
          <span class="positive">+2</span>
          this month
        </p>

      </div>


      <div class="stat-card">

        <div class="stat-top">
          <span>Total Units</span>

          <div class="stat-icon orange">
            🏠
          </div>
        </div>

        <strong>84</strong>

        <p>
          <span class="positive">+6</span>
          this month
        </p>

      </div>


      <div class="stat-card">

        <div class="stat-top">
          <span>Occupied Units</span>

          <div class="stat-icon green">
            👥
          </div>
        </div>

        <strong>72</strong>

        <p>
          <span class="positive">85.7%</span>
          occupancy
        </p>

      </div>


      <div class="stat-card">

        <div class="stat-top">
          <span>Monthly Revenue</span>

          <div class="stat-icon orange">
            ₱
          </div>
        </div>

        <strong>₱486,500</strong>

        <p>
          <span class="positive">+8.4%</span>
          vs last month
        </p>

      </div>

    </section>


    <!-- CHART AREA -->
    <section class="dashboard-grid">

      <!-- REVENUE -->
      <div class="dashboard-card revenue-card">

        <div class="card-header">

          <div>
            <h3>Revenue Overview</h3>
            <p>Monthly rental income</p>
          </div>

          <select class="period-select">
            <option>Last 6 months</option>
            <option>Last 12 months</option>
            <option>This year</option>
          </select>

        </div>


        <div class="chart-placeholder">

          <div class="chart-y-axis">
            <span>₱500K</span>
            <span>₱400K</span>
            <span>₱300K</span>
            <span>₱200K</span>
            <span>₱100K</span>
            <span>₱0</span>
          </div>

          <div class="chart-area">

            <div class="chart-grid-lines">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

            <svg
              class="revenue-line"
              viewBox="0 0 600 250"
              preserveAspectRatio="none"
            >
              <polyline
                points="
                  0,190
                  100,165
                  200,175
                  300,130
                  400,105
                  500,75
                  600,45
                "
              />
            </svg>

            <div class="chart-labels">
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
            </div>

          </div>

        </div>

      </div>


      <!-- OCCUPANCY -->
      <div class="dashboard-card occupancy-card">

        <div class="card-header">

          <div>
            <h3>Occupancy</h3>
            <p>Current unit status</p>
          </div>

        </div>


        <div class="occupancy-content">

          <div class="donut-chart">

            <div class="donut-inner">
              <strong>86%</strong>
              <span>Occupied</span>
            </div>

          </div>


          <div class="occupancy-legend">

            <div>
              <span class="legend-dot occupied"></span>
              <span>Occupied</span>
              <strong>72</strong>
            </div>

            <div>
              <span class="legend-dot vacant"></span>
              <span>Vacant</span>
              <strong>8</strong>
            </div>

            <div>
              <span class="legend-dot maintenance"></span>
              <span>Maintenance</span>
              <strong>4</strong>
            </div>

          </div>

        </div>

      </div>

    </section>


    <!-- BOTTOM -->
    <section class="bottom-grid">

      <!-- RECENT PAYMENTS -->
      <div class="dashboard-card">

        <div class="card-header">

          <div>
            <h3>Recent Payments</h3>
            <p>Latest tenant transactions</p>
          </div>

          <RouterLink to="/payments">
            View all
          </RouterLink>

        </div>


        <div class="payment-list">

          <div class="payment-row">
            <div class="payment-avatar">JD</div>

            <div class="payment-info">
              <strong>John Dela Cruz</strong>
              <span>Unit 204 • Sunrise Apartments</span>
            </div>

            <div class="payment-amount">
              <strong>₱12,500</strong>
              <span>Paid</span>
            </div>
          </div>


          <div class="payment-row">
            <div class="payment-avatar">MA</div>

            <div class="payment-info">
              <strong>Maria Aquino</strong>
              <span>Unit 103 • Greenfield Residences</span>
            </div>

            <div class="payment-amount">
              <strong>₱15,000</strong>
              <span>Paid</span>
            </div>
          </div>


          <div class="payment-row">
            <div class="payment-avatar">RS</div>

            <div class="payment-info">
              <strong>Robert Santos</strong>
              <span>Unit 305 • Sunrise Apartments</span>
            </div>

            <div class="payment-amount">
              <strong>₱10,500</strong>
              <span>Paid</span>
            </div>
          </div>

        </div>

      </div>


      <!-- UPCOMING PAYMENTS -->
      <div class="dashboard-card">

        <div class="card-header">

          <div>
            <h3>Upcoming Payments</h3>
            <p>Rent due soon</p>
          </div>

          <RouterLink to="/payments">
            View all
          </RouterLink>

        </div>


        <div class="upcoming-list">

          <div class="upcoming-row">

            <div class="due-date">
              <strong>15</strong>
              <span>AUG</span>
            </div>

            <div>
              <strong>Anna Reyes</strong>
              <span>Unit 202</span>
            </div>

            <strong>₱14,000</strong>

          </div>


          <div class="upcoming-row">

            <div class="due-date">
              <strong>16</strong>
              <span>AUG</span>
            </div>

            <div>
              <strong>Mark Garcia</strong>
              <span>Unit 401</span>
            </div>

            <strong>₱16,500</strong>

          </div>


          <div class="upcoming-row">

            <div class="due-date">
              <strong>18</strong>
              <span>AUG</span>
            </div>

            <div>
              <strong>Lisa Tan</strong>
              <span>Unit 102</span>
            </div>

            <strong>₱13,000</strong>

          </div>

        </div>

      </div>

    </section>

  </div>
</template>

<script setup>
</script>