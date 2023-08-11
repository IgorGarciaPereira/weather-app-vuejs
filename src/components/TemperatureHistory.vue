<script>
import { ContentLoader } from 'vue-content-loader'
import TemperatureChart from "./TemperatureChart.vue"

export default {
  components: { ContentLoader, TemperatureChart },
  props: ['data', 'labels', 'loading'],
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
    }
  }
}
</script>

<template>
  <section>
    <h2 class="text-2xl font-semibold">
      History
    </h2>

    <form class="form">
      <label>
        Start:
        <input class="input-date" type="date" :defaultValue="calculate7DaysBefore()">
      </label>
      <label>
        End:
        <input
          class="input-date"
          type="date"
          :max="getDateString()"
          :defaultValue="getDateString()"
        >
      </label>
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
    <TemperatureChart v-else :data="data" :labels="labels" />
  </section>
</template>

<style scoped>
.form {
  @apply flex flex-col md:flex-row gap-2;
}

.form > label {
  @apply flex gap-4 flex-1 justify-between;
}

.input-date {
  @apply border py-1 px-2 w-3/4;
}
</style>