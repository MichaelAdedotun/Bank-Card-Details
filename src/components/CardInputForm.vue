<script setup>

import {ref, defineProps, defineEmits, watch} from "vue";
import {useRouter} from "vue-router";

  const props = defineProps({
    modelValue: {
      type: Object,
      required: true,
    }
  });
  const emit = defineEmits(["update:modelValue"])
  const router = useRouter();

  // Reactive form data because it is between different components
  const cardHolder = ref(props.modelValue.cardHolder || "");
  const cardNumber = ref(props.modelValue.cardNumber || "");
  const expiryMonth = ref(props.modelValue.expiryMonth || "");
  const expiryYear = ref(props.modelValue.expiryYear || "");
  const cvc = ref(props.modelValue.cvc || "");

  // Watch for changes in props and update local refs
  watch(() => props.modelValue, (newValue) => {
    cardHolder.value = newValue.cardHolder;
    cardNumber.value = newValue.cardNumber;
    expiryMonth.value = newValue.expiryMonth;
    expiryYear.value = newValue.expiryYear;
    cvc.value = newValue.cvc;
  }, { deep: true });

  // Emit updated values to the parent (App.vue)
  const updateParent = () => {
    emit("update:modelValue", {
      cardHolder: cardHolder.value,
      cardNumber: cardNumber.value,
      expiryMonth: expiryMonth.value,
      expiryYear: expiryYear.value,
      cvc: cvc.value,
    });
  };

  // Validation messages
  const errors = ref({
    cardHolder: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });

  // Function to validate form
  const validateForm = () => {
    let valid = true;

    errors.value = { cardHolder: "", cardNumber: "", expiryDate: "", cvc: "" };

    if (!cardHolder.value.trim()) {
      errors.value.cardHolder = "Cardholder name is required";
      valid = false;
    }
    if (!/^\d{4} \d{4} \d{4} \d{4}$/.test(cardNumber.value)) {
      errors.value.cardNumber = "Enter a valid 16-digit card number";
      valid = false;
    }
    if (
        !expiryMonth.value ||
        !expiryYear.value ||
        expiryMonth.value.length !== 2 ||
        expiryYear.value.length !== 2 ||
        parseInt(expiryMonth.value) < 1 ||
        parseInt(expiryMonth.value) > 12 ||
        parseInt(expiryYear.value) < 25 ||
        parseInt(expiryYear.value) > 99
    ) {
      errors.value.expiryDate = "Enter a valid expiration date";
      valid = false;
    }
    if (!/^\d{3}$/.test(cvc.value)) {
      errors.value.cvc = "CVC must be 3 digits";
    }

    return valid;
  };

  const formatCardNumber = () => {
    cardNumber.value = cardNumber.value
        .replace(/\D/g, "") // Remove non-digits
        .slice(0, 16) // Limit to 16 digits
        .replace(/(\d{4})/g, "$1 ") // Add spaces every 4 digits
        .trim(); // Remove trailing space
  }

  const handleInput = () =>{
    formatCardNumber();
    updateParent();
  }

  const restrictToNumbers = (event) => {
    if (!/^[0-9]$/.test(event.key) && event.key !== "Backspace" && event.key !== "Tab") {
      event.preventDefault(); // Block non-numeric input
    }
  }

  // Function to submit form
  const submitForm = () => {
    if (validateForm()) {
      router.push("/success");
    }
  };



</script>

<template>
  <form @submit.prevent="submitForm" class="flex flex-col justify-start">
    <label for="name" class="text-sm font-semibold mb-1"> CARDHOLDER NAME</label>
    <input type="text"
           v-model="cardHolder" @input="updateParent"
           placeholder="e.g. Michael Adedotun"
           class="border border-gray-300 text-gray-500 font-semibold
                  px-4 py-1 rounded-lg outline-none"
    >
    <p v-if="errors.cardHolder" class="text-sm text-[hsl(0,100%,66%)] pl-4 mt-1">
      {{ errors.cardHolder }}
    </p>

    <label for="number" class="text-sm font-semibold mt-4 mb-1"> CARD NUMBER</label>
    <input type="text"
           v-model="cardNumber" @input="handleInput"
           placeholder="1234 5678 9012 3456"
           maxlength="19"
           class="border border-gray-300 text-gray-500 font-semibold
                  px-4 py-1 rounded-lg outline-none"
    >
    <p v-if="errors.cardNumber" class="text-sm text-[hsl(0,100%,66%)] pl-4 mt-1">
      {{ errors.cardNumber }}
    </p>

    <div class="flex gap-8">
      <div class="block">
        <label for="date" class="block text-sm font-semibold mt-4 mb-1"> EXP. DATE (MM/YY)</label>
        <input type="text"
               v-model="expiryMonth" @input="updateParent"
               @keydown="restrictToNumbers"
               maxlength="2"
               placeholder="MM"
               class="border border-gray-300 text-gray-500 font-semibold
                      px-3 py-1 rounded-lg w-20 outline-none"
        >
        <input type="text"
               v-model="expiryYear" @input="updateParent"
               @keydown="restrictToNumbers"
               maxlength="2"
               placeholder="YY"
               class="border border-gray-300 text-gray-500 font-semibold
                      px-3 py-1 rounded-lg w-20 ml-2 outline-none"
        >
        <p v-if="errors.expiryDate" class="text-sm text-[hsl(0,100%,66%)] pl-3 mt-1">
          {{ errors.expiryDate }}
        </p>
      </div>
      <div>
        <label for="number" class="block text-sm font-semibold mt-4 mb-1">CVC</label>
        <input type="text"
               v-model="cvc" @input="updateParent"
               @keydown="restrictToNumbers"
               maxlength="3"
               placeholder="e.g. 123"
               class="border border-gray-300 text-gray-500 font-semibold
                      px-3 py-1 rounded-lg w-36 outline-none"
        >
        <p v-if="errors.cvc" class="text-sm text-[hsl(0,100%,66%)] pl-3 mt-1">
          {{ errors.cvc }}
        </p>
      </div>
    </div>
    <button
        @click="submitForm"
        type="submit"
        class="bg-[hsl(278,68%,11%)] mt-10 py-1 text-[hsl(270,3%,87%)] font-semibold rounded-lg cursor-pointer"
    >
      Confirm
    </button>
  </form>
</template>

<style scoped>

</style>