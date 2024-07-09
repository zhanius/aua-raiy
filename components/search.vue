<template>
    <div class="bg-violet-200 flex items-center justify-center min-h-screen font-mono font-bold">
      <div class="bg-orange-50 border-black border-2 p-2.5 outline-none shadow-[5px_5px_0px_rgba(0,0,0,1)]  max-w-2xl w-full sm:px-10 sm:py-6 flex flex-col justify-center gap-6 items-start">
        <div class="input-div w-full flex gap-4 sm:gap-8">
          <input
            id="search"
            v-model="searchQuery"
            class="flex-grow text-lg sm:text-xl md:text-2xl text-black border-black border-2 p-2.5 focus:outline-none focus:shadow-[5px_5px_0px_rgba(0,0,0,1)] focus:bg-[#f3d6f0] active:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
            placeholder="Enter Your Location"
          />
          <button @click="searchCity" class="bg-slate-300 border-black border-2 p-2.5 outline-none shadow-[5px_5px_0px_rgba(0,0,0,1)] flex items-center justify-center" type="button">
            <img src="../assets/magnifying-glass.png" alt="Search" class="w-6 h-6"/>
          </button>
        </div>
        <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
        <div class="w-full" v-if="weatherVisible">
          <Weather 
            :city="weatherData.city" 
            :temperature="weatherData.temperature" 
            :description="weatherData.description" 
            :humidity="weatherData.humidity" 
            :icon="weatherData.icon"
            :wind="weatherData.wind"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Weather from './weather.vue';
  
  export default {
    components: {
      Weather,
    },
    data() {
      return {
        searchQuery: '',
        weatherData: null,
        weatherVisible: false,
        errorMessage: '',
      };
    },
    methods: {
      validateInput() {
        if (!this.searchQuery) {
          this.errorMessage = 'Please enter a city name.';
          return false;
        }
        const cityNamePattern = /^[a-zA-Z\s-]+$/;
        if (!cityNamePattern.test(this.searchQuery)) {
          this.errorMessage = 'Please enter a valid city name.';
          return false;
        }
        this.errorMessage = '';
        return true;
      },
      async searchCity() {
        if (!this.validateInput()) {
          this.weatherData = null;
          this.weatherVisible = false;
          return;
        }
  
        try {
          const API_KEY = import.meta.env.VITE_API_KEY;
          const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${this.searchQuery}&appid=${API_KEY}`;
          const response = await fetch(API_URL);
  
          if (!response.ok) {
            throw new Error('City not found');
          }
  
          const data = await response.json();
  
          console.log(data);
 
          this.weatherData = {
            city: data.name,
            temperature: (data.main.temp - 273.15).toFixed(2) + '°C',
            description: data.weather[0].description,
            humidity: data.main.humidity + '%',
            icon: data.weather[0].icon,
            wind: data.wind.speed
          };

          console.log(this.weatherData.wind)
  
          this.weatherVisible = true;
          this.errorMessage = '';
        } catch (error) {
          this.errorMessage = 'City not found. Please try again.';
          this.weatherData = null;
          this.weatherVisible = false;
        }
      },
    },
  };
  </script>
  
  <style>
  .input-div {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
  }
  </style>
  