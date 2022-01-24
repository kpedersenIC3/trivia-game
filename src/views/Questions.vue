<script setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { computed } from 'vue';


const router = useRouter();
const store = useStore();

const currentuser = computed(() => store.getters.getCurrentUser)

const goToResult = () => router.push('/result')



</script>

<template>
    <h2>Hello {{ currentuser.username }} welcome to the Questions</h2>
    <br>
    <h1>Your current score is {{ currentuser.currentscore }}</h1>
    <button @click="goToResult">Go To Result</button>
</template>

<style scoped>

</style>