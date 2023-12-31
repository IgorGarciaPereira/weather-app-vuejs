<script>
import TemperatureHistory from "../components/TemperatureHistory.vue"
export default {
  name: "WeatherPage",
  components: {TemperatureHistory},
  data(){
    return {
      timeToday: this.formatDateTime(),
      dateToday: new Date().toLocaleDateString('en-us', {weekday: 'long', 'year': 'numeric', month: 'short'}),
      coordinates: {},
      weather: {
        temperature: null,
        temperature_unit: "°C"
      },
      error: {
        message: ""
      },
      chart: {
        temperatures: [],
        precipitations: [],
        labels: [],
        loading: true
      }
    }
  },

  watch: {
    coordinates(newValue, _){
      this.getWeather()
    }
  },
  mounted(){
    this.getUserLocation();
  },
  methods: {
    getUserLocation(){
      if (window.navigator.geolocation){
        window.navigator.geolocation.getCurrentPosition(
          (geoObject) => this.coordinates = geoObject.coords,
          (geoError) => this.error.message = geoError.message
        )
      } else {
        this.error.message = "Browser don't supported"
      }
    },
    getWeather(){
      const urlApi = "https://api.open-meteo.com/v1/forecast"
      const params = {
        latitude: this.coordinates.latitude,
        longitude: this.coordinates.longitude,
        current_weather: true,
        daily: ["temperature_2m_mean"],
        timezone: "GMT"
      }
      const queryParams = new URLSearchParams(params);
      const url = `${urlApi}?${queryParams.toString()}`
      this.chart.loading = true;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          this.weather.temperature = Number.parseInt(data.current_weather.temperature)
          this.chart.labels = data.daily.time
          this.chart.temperatures = data.daily.temperature_2m_mean
          this.chart.loading = false;
        })
        .catch((err) => console.log(err))
    },

    getHistory(startDate = null, endDate = null){
      const urlApi = "https://archive-api.open-meteo.com/v1/archive"
      const params = {
        latitude: this.coordinates.latitude,
        longitude: this.coordinates.longitude,
        start_date: startDate,
        end_date: endDate,
        daily: "temperature_2m_mean,precipitation_sum",
        timezone: "GMT"
      }
      const queryParams = new URLSearchParams(params);
      const url = `${urlApi}?${queryParams.toString()}`
      this.chart.loading = true;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          this.chart.labels = data.daily.time;
          this.chart.temperatures = data.daily.temperature_2m_mean;
          this.chart.precipitations = data.daily.precipitation_sum;
          this.chart.loading = false;
        })
        .catch((err) => console.log(err))

    },
    formatDateTime(){
      const now = new Date();
      return `${now.getHours()}:${now.getMinutes()}`
    }

  }
}
</script>

<template>
  <div class="page">
    <p v-if="error.message" class="error-message">
      {{ error?.message }}
    </p>

    <div v-else class="today-info">
      <p class="location-area">
        {{ coordinates?.latitude }}, {{ coordinates?.longitude }}
      </p>

      <p>{{ timeToday }} - {{ dateToday }}</p>

      <p class="temperature-now">
        {{ weather?.temperature }} <span class="text-4xl text-primary">{{ weather.temperature_unit }}</span>
      </p>
    </div>
    <hr class="border border-b-[1px] border-0 my-4">
    <div class="mt-8">
      <TemperatureHistory
        :temperatures="chart.temperatures"
        :precipitations="chart.precipitations"
        :labels="chart.labels"
        :loading="chart.loading"
        :handle-search="getHistory"
      />
    </div>
  </div>
</template>

<style scoped>
.page{
  @apply rounded shadow-md p-8 border flex flex-col bg-white dark:bg-black;
}

.today-info {
  @apply flex flex-col gap-4;
}
.location-area{
  @apply bg-shadow px-4 py-2 rounded h-8;
  @apply min-w-full text-white flex place-items-center;
}

.error-message{
  @apply bg-error px-4 py-2 rounded text-white font-semibold;
}

.temperature-now {
  @apply text-8xl text-center;
}
</style>