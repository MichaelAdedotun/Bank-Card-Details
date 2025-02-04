<script setup>
import {useRouter} from "vue-router";

  const router = useRouter();

  const toCardInput = () => {
    router.push("/");
  };
</script>

<template>
      <div class="h-screen w-full flex flex-col justify-center items-center">
        <img src="/src/assets/icon-complete.svg"
             alt="complete icon"
             class="mb-5"
        >
        <h2 class="text-2xl font-semibold text-[hsl(278,68%,11%)] tracking-widest mb-2" >THANK YOU!</h2>
        <p class="text-sm font-semibold text-[hsl(279,6%,55%)] tracking-wide mb-8">We've added your card details</p>
        <a href=""
           @click="toCardInput"
           class="bg-[hsl(278,68%,11%)] w-1/3 py-2 text-center text-[hsl(270,3%,87%)] text-sm rounded-lg">
              Continue
        </a>
      </div>
</template>

<style>

</style>