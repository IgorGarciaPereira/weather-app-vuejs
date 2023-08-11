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
  props: ["temperatures", "precipitations", "labels"],
  data() {
    return {
      chartData: {
        labels: this.$props.labels,
        datasets: [
          {
            label: 'Temperature',
            backgroundColor: '#f87979',
            data: this.$props.temperatures
          },
          {
            label: 'Precipitations',
            backgroundColor: '#8d99ae',
            data: this.$props.precipitations
          },
        ]
      },
      chartOptions: {
        responsive: true
      }
    }
  },

  watch: {
    temperatures(newValue, _){
      this.chartData.datasets[0].data = newValue;
      this.$refs.chart.$forceUpdate()
    },
    precipitations(newValue, _){
      this.chartData.datasets[1].data = newValue
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
