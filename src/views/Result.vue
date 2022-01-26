<script setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ref, computed } from 'vue';
import { compileTemplate } from 'vue/compiler-sfc';
//create the router and the store
const router = useRouter()
const store = useStore()

//get the current user
const currentuser = computed(() => store.getters.getCurrentUser)
//Move to the start page to try once more
const goToStart = () => {
    if(store.getters.getCurrentUser.currentscore > store.getters.getCurrentUser.highScore){
        store.dispatch("setHighScore")
    }
    
    router.push('/')
}
</script>

<template>
<!-- Personalize a message displaying the score that the user got -->
    <h2>Congratulations {{currentuser.username}}</h2>
    <h2>{{currentuser.currentscore > currentuser.highScore ? `Wow new Hi-Score!!! You got ${currentuser.currentscore} points!` : `You got ${currentuser.currentscore}`}}</h2>
    <button @click="goToStart">Go To Back To Start to try once more</button>
</template>

<style scoped>
</style>