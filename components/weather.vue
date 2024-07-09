<template>
    <div class="border-black border-2 p-2.5 outline-none shadow-[5px_5px_0px_rgba(0,0,0,1)] shadow-[5px_5px_0px_rgba(0,0,0,1)] flex items-center justify-center text-3xl p-6 sm:p-7 md:p-15"> 
      <div class="city rounded-2xl outline-none w-full sm:w-11/12 p-2 flex justify-center items-center flex-col font-sans">
        <h1 class="text-lg sm:text-2xl md:text-3xl lg:text-4xl m-5 font-bold">{{ city }}</h1>
        <h1 class="font-light text-base sm:text-2xl md:text-3xl lg:text-6xl font-serif font-thin break-words flex items-center">{{ temperature }} <img :src="getWeatherIconUrl(icon)" :alt="description" class="sm:w-14 lg:w-30 md:w-1/3 mx-10"></h1>
        <h2 class="text-base sm:text-md md:text-lg lg:text-xl font-normal my-2">{{ description }} <br> </h2>
        <div class="flex">
            <h2 class="text-base sm:text-lg md:text-xl lg:text-2xl flex flex-col my-5 mr-20"> <img src="https://img.icons8.com/?size=48&id=9ClbMTh8trmW&format=png" class="sm:w-10">{{ humidity }}</h2>
            <h2 class="text-base sm:text-lg md:text-xl lg:text-2xl flex flex-col my-5 ml-20"> <img src="https://img.icons8.com/?size=48&id=RtDA8YDN9Mi9&format=png" class="sm:w-10">{{ wind }}</h2>
        </div>
    </div>
    </div>
  </template> 
  
  <script>
  export default {
    props: {
      city: {
        type: String,
        required: true
      },
      temperature: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      humidity: {
        type: String,
        required: true
      },
      icon: {
        type: String,
        required: true  
      },
      wind: {
        type: String,
        required:true
      }
    },
    methods:{
        getWeatherIconUrl(iconCode) {
        return `./assets/icons/${iconCode}.png`;
    }
    }
  };
  </script>
  
  