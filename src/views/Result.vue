<script setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ref, computed } from 'vue';

const router = useRouter()
const store = useStore()


const currentuser = computed(() => store.getters.getCurrentUser)

const goToStart = () => router.push('/')
</script>

<template>
    <h2>Congratulations {{currentuser.username}}</h2>
    <h2>You got {{currentuser.currentscore}} points!!</h2>
    <button @click="goToStart">Go To Back To Start</button>
</template>

<style scoped>

</style>