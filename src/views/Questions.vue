<script setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ref, computed } from 'vue';


const router = useRouter();
const store = useStore();


const currentuser = computed(() => store.getters.getCurrentUser)
const pickedAnswer = ref('')
const goToResult = () => router.push('/result')
let shuffleArray = [0,1,2,3].sort((a, b) => 0.5 - Math.random())
const questionNumber = ref(0)
const nextQuestion = () => {
    questionNumber.value += 1;
    if(pickedAnswer.value === "true"){
        store.commit("updateCurrentScore", 10)
    }
}


</script>

<template>
    <h2>Hello {{ currentuser.username }} welcome to the Questions</h2>
    <br>
    <h2>Your current score is {{ currentuser.currentscore }}</h2>
    <div v-for="i in Number(store.getters.getQuestionOptions.amount)" :key="i">
    <div v-if="(i-1) === questionNumber">
        <form v-for="question in store.getters.getQuestions.slice(i-1,i)" :key="question">
            <p>{{ question.question }}</p>
            <div v-for="index of shuffleArray" :key="index">
                <input v-if="index===3" type="radio" id="0" value="true" v-model="pickedAnswer">
                <label v-if="index===3" for="0">{{ question.correct_answer }}</label>
                <input v-if="index===2" type="radio" id="1" value="false1" v-model="pickedAnswer">
                <label v-if="index===2" for="1">{{ question.incorrect_answers[2] }}</label>
                <input v-if="index===1" type="radio" id="2" value="false2" v-model="pickedAnswer">
                <label v-if="index===1" for="2">{{ question.incorrect_answers[1]}}</label>
                <input v-if="index===0" type="radio" id="3" value="false3" v-model="pickedAnswer">
                <label v-if="index===0" for="3">{{ question.incorrect_answers[0] }}</label>
            </div>
            <button @click.prevent="nextQuestion">Next</button>
        </form>
    </div>
    </div>
    <button @click="goToResult">Go to Results</button>
</template>

<style scoped>
</style>