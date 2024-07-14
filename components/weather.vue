<template>
  <div
    class="border-black border-2 p-2.5 outline-none shadow-[5px_5px_0px_rgba(0,0,0,1)] shadow-[5px_5px_0px_rgba(0,0,0,1)] flex items-center justify-center text-3xl p-6 sm:p-7 md:p-15"
  >
    <div
      class="city rounded-2xl outline-none w-full sm:w-11/12 p-2 flex justify-center items-center flex-col font-sawarabi"
    >
      <h1
        class="text-4xl sm:text-2xl md:text-5xl lg:text-5xl m-3 font-bold break-words flex items-center underline text-stone-800"
      >
        {{ city }}
        <img
          src="https://img.icons8.com/?size=50&id=7880&format=png"
          class="mx-2 w-7 sm:w-10 lg:w-10 md:w-17"
        />
      </h1>
      <h1
        class="font-light text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-thin break-words flex items-center m-3"
      >
        {{ temperature }}
        <img
          :src="getWeatherIconUrl(icon)"
          :alt="description"
          class="w-20 sm:w-30 lg:w-35 md:w-45 mx-5"
        />
      </h1>
      <h2 class="text-base text-lg sm:text-md md:text-lg lg:text-xl my-1">
        {{ description }} <br />
      </h2>
      <div class="flex">
        <h2
          class="text-base sm:text-lg md:text-xl lg:text-2xl flex flex-col my-5 mr-20"
        >
          <img
            src="https://img.icons8.com/?size=48&id=9ClbMTh8trmW&format=png"
            class="w-10 sm:w-10"
          />{{ humidity }}
        </h2>
        <h2
          class="text-base sm:text-lg md:text-xl lg:text-2xl flex flex-col my-5 ml-20"
        >
          <img
            src="https://img.icons8.com/?size=48&id=RtDA8YDN9Mi9&format=png"
            class="w-10 sm:w-10"
          />{{ wind }}
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    city: {
      type: String,
      required: true,
    },
    temperature: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    humidity: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    wind: {
      type: String,
      required: true,
    },
  },
  methods: {
    getWeatherIconUrl(iconCode) {
      return `_nuxt/components/icons/${iconCode}.png`;
    },
  },
};
</script>
