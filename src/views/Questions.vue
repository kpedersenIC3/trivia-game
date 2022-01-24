<script setup>
import { useRouter } from 'vue-router';


const router = useRouter()
const goToResult = () => router.push('/result')



</script>

<template>
    <h2>Hello welcome to the Questions</h2>
    <button @click="goToResult">Go To Result</button>
</template>

<style scoped>

</style>