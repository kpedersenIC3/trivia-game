<script setup>
import { useRouter } from 'vue-router';
import { reactive, ref } from 'vue';


const username = ref('')
const difficulty = ref('')
const noOfQuestions = ref('')
const category = ref('')

const router = useRouter()
const goToQuestions = () => router.push('/questions')

</script>

<template>
    <h2>Welcome to the Trivia App</h2>
    <p>Please enter your username:</p>
    <input v-model="username">
    <p>{{username}}</p>
    <br>
    <div class="start-selectors">
        <div id="start-selector">
        <p>Select Difficulty</p>
        <input type="radio" value="easy" v-model="difficulty">
        <label for="easy">Easy</label>
        <input type="radio" value="hard" v-model="difficulty">
        <label for="hard">Hard</label>
        <br>
        <span>You selected {{ difficulty }} mode</span>
        </div>

        <div id="start-selector">
        <p>Choose amount of questions</p>
        <input type="radio" value="5" v-model="noOfQuestions">
        <label for="5">5</label>
        <input type="radio" value="10" v-model="noOfQuestions">
        <label for="10">10</label>
        <input type="radio" value="15" v-model="noOfQuestions">
        <label for="15">15</label>
        <input type="radio" value="20" v-model="noOfQuestions">
        <label for="20">20</label>
        <br>
        <span>You selected {{ noOfQuestions }} questions</span>
        </div>

        <div id="start-selector">
        <p>Choose a category</p>
        <select v-model="category">
            <option disabled value="">Choose a category</option>
            <option>General Knowledge</option>
            <option>Science and Nature</option>
            <option>Sports</option>
            <option>History</option>
        </select>
        <br>
        <span>You chose {{ category }} mode</span>
        </div>
    </div>
    <br>
    <button @click="goToQuestions">Go To Questions</button>
</template>

<style scoped>
    h2 {
        animation: bounceInDown;
        animation-duration: 1s;
        font-weight: 1700;
    }
    .start-selectors{
        display:flex;
        justify-content: center;
    }
    #start-selector{
        padding:2%;
    }
</style>
