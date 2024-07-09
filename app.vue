<template>
    <div>
    <search @search-clicked="showWeather = true"></search>
    <div class="container">
      <weather v-if="showWeather"></weather>
    </div>
  </div>
</template>

<script>
import Search from './components/search.vue'
import Weather from './components/weather.vue'

export default {
  components: {
    Search,
    Weather
  },
  data() {
    return {
      showWeather: false
    }
  }
}
</script>