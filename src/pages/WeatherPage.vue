<script>
export default {
  name: "WeatherPage",
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
        data: [],
        labels: []
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
          this.chart.data = data.daily.temperature_2m_mean
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
    <div class="today-info">
      <p class="location-area">
        {{ coordinates?.latitude }}, {{ coordinates?.longitude }}
      </p>

      <p>{{ timeToday }} - {{ dateToday }}</p>

      <p class="temperature-now">
        {{ weather?.temperature }} <span class="text-4xl">{{ weather.temperature_unit }}</span>
      </p>
    </div>
  </div>
</template>

<style scoped>
.page{
  @apply rounded shadow-md p-8 border flex flex-col;
}

.today-info {
  @apply flex flex-col gap-4;
}
.location-area{
  @apply bg-shadow px-4 py-2 rounded h-8;
  @apply min-w-full text-white flex place-items-center;
}

.temperature-now {
  @apply text-8xl text-center;
}
</style>