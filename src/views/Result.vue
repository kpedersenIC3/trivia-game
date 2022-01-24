<script setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';


const router = useRouter()
const store = useStore()



const goToStart = () => router.push('/')
</script>

<template>
    <h2>You are now in Result</h2>
    <button @click="goToStart">Go To Back To Start</button>
</template>

<style scoped>

</style>