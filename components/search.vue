<template>
  <div class="bg-violet-200 flex items-center flex-col justify-center min-h-screen font-rowdies font-bold">
    <div class="flex max-w-2xl w-full justify-between mb-8">
      <h2 class="text-4xl sm:xl md:xl lg:5xl">Auaraiy.kz</h2>
      <a class="float-left w-10" target="_blank" href="https://t.me/zhansuuw">
        <img src="https://img.icons8.com/?size=64&id=HTBOiI9JKlWY&format=png" alt="" />
      </a>
    </div>
    <div
      class="bg-orange-50 border-black border-2 p-2.5 outline-none shadow-[5px_5px_0px_rgba(0,0,0,1)] max-w-2xl w-full sm:px-10 sm:py-6 flex flex-col justify-center gap-6 items-start">
      <div class="input-div w-full flex gap-2 sm:gap-3">
        <input id="search" v-model="searchQuery"
          class="flex-grow text-lg sm:text-xl md:text-2xl text-black border-black border-2 p-2.5 outline-none shadow-[5px_5px_0px_rgba(0,0,0,1)] focus:bg-[#f3d6f0] active:shadow-[2px_2px_0px_rgba(0,0,0,1)]"
          placeholder="Enter Your Location" />
        <button @click="searchCity"
          class="bg-slate-300 border-black border-2 p-2.5 outline-none shadow-[5px_5px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_rgba(0,0,0,1)] flex items-center justify-center"
          type="button">
          <img src="../assets/magnifying-glass.png" alt="Search" class="w-6 h-6" />
        </button>
      </div>
      <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
      <div class="w-full" v-if="weatherVisible">
        <Weather :city="weatherData.city" :temperature="weatherData.temperature" :description="weatherData.description"
          :humidity="weatherData.humidity" :icon="weatherData.icon" :wind="weatherData.wind" />
      </div>
    </div>
  </div>
</template>

<script>
import Weather from "./weather.vue";

export default {
  components: {
    Weather,
  },
  data() {
    return {
      searchQuery: "",
      weatherData: null,
      weatherVisible: false,
      errorMessage: "",
    };
  },
  methods: {
    translateDescription(description) {
      const translations = {
        "01d": "ashyq aspan",
        "01n": "ashyq aspan",
        "02d": "säl būltty aua raiy",
        "02n": "säl būltty aya raiy",
        "03d": "ūşpa būlttar",
        "03n": "ūşpa būlttar",
        "04d": "būltty aua raiy",
        "04n": "būltty aua raiy",
        "09d": "nöserli jañbyr",
        "09n": "nöserli jañbyr",
        "10d": "jauyn-şaşyn",
        "10n": "jauyn-şaşyn",
        "11d": "naizağai",
        "11n": "naizağai",
        "13d": "qar",
        "13n": "qar",
        "50d": "tūman",
        "50n": "tūman",
      };

      return translations[description] || description;
    },
    getIconUrl(description) {
      const translations = {
        "01d": "https://img.icons8.com/?size=48&id=M0RPnzNPMiZi&format=png",
        "01n": "https://img.icons8.com/?size=48&id=fehaCOqehQKm&format=png",
        "02d": "https://img.icons8.com/?size=48&id=R5QLDwYPNm1R&format=png",
        "02n": "https://img.icons8.com/?size=48&id=Al5kevhvRLMt&format=png",
        "03d": "https://img.icons8.com/?size=48&id=W1YHvCxiIHyN&format=png",
        "03n": "https://img.icons8.com/?size=48&id=W1YHvCxiIHyN&format=png",
        "04d": "https://img.icons8.com/?size=48&id=YCGDxvKcUXYv&format=png",
        "04n": "https://img.icons8.com/?size=48&id=YCGDxvKcUXYv&format=png",
        "09d": "https://img.icons8.com/?size=48&id=95scIGHYeKzT&format=png",
        "09n": "https://img.icons8.com/?size=48&id=95scIGHYeKzT&format=png",
        "10d": "https://img.icons8.com/?size=48&id=bFjyGgCI62A8&format=png",
        "10n": "https://img.icons8.com/?size=48&id=bFjyGgCI62A8&format=png",
        "11d": "https://img.icons8.com/?size=48&id=1MIo4L4pTj6s&format=png",
        "11n": "https://img.icons8.com/?size=48&id=1MIo4L4pTj6s&format=png",
        "13d": "https://img.icons8.com/?size=48&id=oYGjazh2cGfB&format=png",
        "13n": "https://img.icons8.com/?size=48&id=oYGjazh2cGfB&format=png",
        "50d": "https://img.icons8.com/?size=48&id=Uf8OFfff3BZZ&format=png",
        "50n": "https://img.icons8.com/?size=48&id=Uf8OFfff3BZZ&format=png",
      };
      return translations[description] || description;
    },
    validateInput() {
      if (!this.searchQuery) {
        this.errorMessage = "Please enter a city name.";
        return false;
      }
      const cityNamePattern = /^[a-zA-Z\s-]+$/;
      if (!cityNamePattern.test(this.searchQuery)) {
        this.errorMessage = "Please enter a valid city name.";
        return false;
      }
      this.errorMessage = "";
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
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          this.searchQuery
        )}&appid=${API_KEY}`;
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("City not found");
        }

        const data = await response.json();

        if (data.cod !== 200) {
          throw new Error("City not found");
        }

        const iconCode = data.weather[0].icon;

        this.weatherData = {
          city: data.name,
          temperature: (data.main.temp - 273.15).toFixed(2) + "°C",
          description: this.translateDescription(iconCode),
          humidity: data.main.humidity + "%",
          icon: this.getIconUrl(iconCode),
          wind: data.wind.speed,
        };

        this.weatherVisible = true;
        this.errorMessage = "";
      } catch (error) {
        this.errorMessage = "City not found. Please try again.";
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
