<script setup>
import {ref} from "vue";

  const formData = ref({
    cardNumber: "",
    cardHolder: "",
    expiryMonth: "",
    expiryYear: "",
    cvc: "",
  });

</script>

<template>
    <div class="md:flex">
<!--  card preview section-->
      <div class="bg-[url(/src/assets/bg-main-mobile.png)] bg-no-repeat bg-cover h-64 w-full
                  md:bg-[url(/src/assets/bg-main-desktop.png)] md:bg-no-repeat md:bg-cover
                  md:h-screen md:w-1/3 lg:w-1/2"
      >
<!--    The front page of the card design-->
        <div class="bg-[url(/src/assets/bg-card-front.png)] bg-cover bg-no-repeat
                    w-80 h-44 px-8 py-4 rounded-xl absolute top-36 left-6 z-100
                    md:top-[18%] md:left-20
                    xl:top-[25%] xl:left-40"
        >
<!--      The card logo-->
          <div class="mb-8">
            <img src="/src/assets/card-logo.svg" alt="card logo">
          </div>
<!--      The other details on the card front-->
          <div class="text-white w-full">
            <h2 class="text-2xl mb-3">{{formData.cardNumber || "0000 0000 0000 0000"}}</h2>
            <p class="flex justify-between">
              <span>{{ formData.cardHolder || "CARDHOLDER NAME" }}</span>
              <span>{{ formData.expiryMonth || "00" }} / {{ formData.expiryYear || "00" }}</span>
            </p>
          </div>
        </div>
<!--    The back page pf the card design-->
        <div class="bg-[url(/src/assets/bg-card-back.png)] bg-no-repeat bg-cover
                    w-80 h-44 px-8 py-5 rounded-xl absolute top-8 left-16
                    md:top-[52%] md:left-36
                    xl:top-[50%] xl:left-56 xl:mt-5"
        >
            <h2 class="text-black text-lg absolute top-[72px] right-10"> {{ formData.cvc || "000" }} </h2>
        </div>
      </div>

<!--  CardInputForm and SuccessMessage section {routing}-->
      <div class="flex justify-center items-center align-middle mt-32 md:w-full">
          <router-view :modelValue="formData" @update:modelValue="formData = $event"/>
      </div>
    </div>
</template>

<style scoped>

</style>
