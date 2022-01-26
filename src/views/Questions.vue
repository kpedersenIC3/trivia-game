<script setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ref, computed } from 'vue';

//create the router and the store
const router = useRouter();
const store = useStore();



const nextbuttontext = "Next Question"
const gotoresultsbuttontext = "Go to results!"
const currentuser = computed(() => store.getters.getCurrentUser)
const pickedAnswer = ref('')
const shuffleArray = ref([0,1,2,3].sort((a, b) => 0.5 - Math.random()))
//Array to randomize the answers position

//const shuffleArray = () => {return [0,1,2,3].sort((a, b) => 0.5 - Math.random())}
//let shufflearray = shuffleArray()
//Start with the first question
const questionNumber = ref(0)

//On buttonclick, check if it's the true answer, update score and move on to next question
const nextQuestion = () => {
    let newShuffle = [0,1,2,3].sort((a, b) => 0.5 - Math.random())
    if(pickedAnswer.value === "true"){
        store.commit("updateCurrentScore", 10)
    }
    questionNumber.value += 1
    pickedAnswer.value = ''
    shuffleArray.value = newShuffle
    // if all questions are done, go to results 
    if(questionNumber.value === Number(store.getters.getQuestionOptions.amount)){
        router.push('/result')
    }
}

</script>

<template>
 <!-- Say hello to the user and move through one
 question at the time based on users choices on start page -->
    <h2>Hello {{ currentuser.username }} welcome to the Questions</h2>
    <br>
    <h2>Your current score is {{ currentuser.currentscore }}</h2>
    <div v-for="i in Number(store.getters.getQuestionOptions.amount)" :key="i">
    <div v-if="(i-1) === questionNumber">
        <p>Question {{questionNumber + 1}} of {{store.getters.getQuestionOptions.amount}}</p>
        <form v-for="question in store.getters.getQuestions.slice(i-1,i)" :key="question">
            <p><strong>{{ question.question }}</strong></p>
            <div v-for="index of shuffleArray" :key="index">
                <input v-if="index===3" type="radio" id="truth" value="true" v-model="pickedAnswer">
                <input v-else type="radio" :id="index" :value="index" v-model="pickedAnswer">
                <label v-if="index===3" for="truth">{{ question.correct_answer }}</label>
                <label v-else :for="index">{{ question.incorrect_answers[index]}}</label>
            </div>
            <br>
            <button @click.prevent="nextQuestion">{{ questionNumber+1 === Number(store.getters.getQuestionOptions.amount) ? gotoresultsbuttontext:nextbuttontext }}</button>
        </form>
    </div>
    </div>
</template>

<style scoped>
</style>