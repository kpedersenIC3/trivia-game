<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

const goToStart = () => router.push('/')
</script>

<template>
    <h2>You are now in Result</h2>
    <button @click="goToStart">Go To Back To Start</button>
</template>

<style scoped>

</style>