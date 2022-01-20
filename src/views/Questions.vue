<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

const goToResult = () => router.push('/result')
</script>

<template>
    <h2>You are now in Questions</h2>
    <button @click="goToResult">Go To Result</button>
</template>

<style scoped>

</style>