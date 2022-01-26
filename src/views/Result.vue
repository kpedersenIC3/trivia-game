<script setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ref, computed } from 'vue';
//create the router and the store
const router = useRouter()
const store = useStore()

//get the current user
const currentuser = computed(() => store.getters.getCurrentUser)
//Move to the start page to try once more
const goToStart = () => router.push('/')
</script>

<template>
<!-- Personalize a message displaying the score that the user got -->
    <h2>Congratulations {{currentuser.username}}</h2>
    <h2>You got {{currentuser.currentscore}} points!!</h2>
    <button @click="goToStart">Go To Back To Start to try once more</button>
</template>

<style scoped>
</style>