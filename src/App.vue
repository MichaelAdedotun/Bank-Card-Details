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
    <div class="lg:flex">
<!--  card preview section-->
      <div class="bg-[url(/src/assets/bg-main-mobile.png)] bg-no-repeat bg-cover h-64 w-full
                  lg:bg-[url(/src/assets/bg-main-desktop.png)] lg:bg-no-repeat lg:bg-cover
                  lg:h-screen lg:w-1/2"
      >
<!--    The front page of the card design-->
        <div class="bg-[url(/src/assets/bg-card-front.png)] bg-cover bg-no-repeat
                    w-80 h-44 px-8 py-4 rounded-xl absolute top-36 left-6 z-100
                    lg:top-24 lg:left-20
                    xl:top-44 xl:left-40"
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
                    lg:top-80 lg:left-36
                    xl:top-96 xl:left-56 xl:mt-5"
        >
            <h2 class="text-black text-lg absolute top-[72px] right-10"> {{ formData.cvc || "000" }} </h2>
        </div>
      </div>

<!--  CardInputForm and SuccessMessage section {routing}-->
      <div class="w-full flex justify-center items-center">
          <router-view :modelValue="formData" @update:modelValue="formData = $event"/>
      </div>
    </div>
</template>

<style scoped>

</style>
