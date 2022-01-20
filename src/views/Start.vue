<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

const goToQuestions = () => router.push('/questions')
</script>

<template>
    <h2>Welcome to the Trivia App</h2>
    <button @click="goToQuestions">Go To Questions</button>
</template>

<style scoped>
    h2 {
        animation: bounceInDown;
        animation-duration: 1s;
        font-weight: 1700;
    }
</style>
