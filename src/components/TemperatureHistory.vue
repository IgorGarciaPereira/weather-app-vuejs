<script>
import { ContentLoader } from 'vue-content-loader'
import TemperatureChart from "./TemperatureChart.vue"

export default {
  components: { ContentLoader, TemperatureChart },
  props: ['temperatures', 'precipitations', 'labels', 'loading', 'handleSearch'],
  methods: {
    getDateString(date = null){
      let now = new Date();
      if (date){
        now = new Date(date);
      }
      return now.toISOString().split("T")[0];
    },

    calculate7DaysBefore(){
      const today = new Date();
      today.setDate(today.getDate() - 7);
      return this.getDateString(today)
    },

    handleInternalSearch(event){
      event.preventDefault();
      const data = new FormData(event.target);
      if (this.$props.handleSearch){
        this.$props.handleSearch(
          data.get('start_date'),
          data.get('end_date')
        )
      }
    }
  }
}
</script>

<template>
  <section>
    <h2 class="text-2xl font-semibold mb-4">
      History
    </h2>

    <form class="form" @submit="handleInternalSearch">
      <label>
        Start:
        <input
          id="start_date"
          name="start_date"
          class="input-date"
          type="date"
          :defaultValue="calculate7DaysBefore()"
        >
      </label>
      <label>
        End:
        <input
          id="end_date"
          name="end_date"
          class="input-date"
          type="date"
          :max="getDateString()"
          :defaultValue="getDateString()"
        >
      </label>
      <button type="submit" class="base-button">
        Search
      </button>
    </form>

    <content-loader
      v-if="loading"
      viewBox="0 0 300 110"
      :speed="5"
      primary-color="#f3f3f3"
      secondary-color="#ecebeb"
    >
      <rect
        x="0"
        y="56"
        rx="3"
        ry="3"
        width="410"
        height="6"
      /> 
      <rect
        x="0"
        y="72"
        rx="3"
        ry="3"
        width="380"
        height="6"
      />
      <rect
        x="0"
        y="88"
        rx="3"
        ry="3"
        width="380"
        height="6"
      />
      <rect
        x="0"
        y="104"
        rx="3"
        ry="3"
        width="380"
        height="6"
      />
    </content-loader>
    <TemperatureChart
      v-else
      :temperatures="temperatures"
      :precipitations="precipitations"
      :labels="labels"
    />
  </section>
</template>

<style scoped>
.base-button{
  @apply bg-primary text-white rounded px-4 py-2 cursor-pointer;
}

.form {
  @apply flex flex-col md:flex-row gap-2;
}

.form > label {
  @apply flex gap-4 flex-1 justify-between items-center;
}

.input-date {
  @apply border py-1 px-2 w-3/4;
}
</style>