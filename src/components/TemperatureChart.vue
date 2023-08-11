<script>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default {
  name: 'TemperatureChart',
  components: { Line },
  props: ["data", "labels"],
  data() {
    return {
      chartData: {
        labels: this.$props.labels,
        datasets: [ { data: this.$props.data } ]
      },
      chartOptions: {
        responsive: true
      }
    }
  },

  watch: {
    data(newValue, _){
      this.chartData.datasets[0].data = newValue;
      this.$refs.chart.$forceUpdate()
    },
    labels(newValue, _){
      this.chartData.labels = newValue;
    }
  }
}
</script>

<template>
  <Line
    id="my-chart-id"
    ref="chart"
    :options="chartOptions"
    :data="chartData"
  />
</template>
