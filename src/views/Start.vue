<script setup>
import { useRouter } from 'vue-router';
import { reactive, ref, computed } from 'vue';
import { onMounted } from 'vue';
import { useStore } from 'vuex';

//create the router and the store
const router = useRouter()
const store = useStore()

//get the users from the userAPI when starting
onMounted(() => {
    store.dispatch("fetchUsers")
})

//Save the user inputs in variables
const username = ref('')
const difficulty = ref('easy')
const noOfQuestions = ref('5')
const category = ref('General Knowledge')

//To start the game initialize the user and question selections and move to questions view
const onSubmit = () => {
    store.commit("setCurrentUser", {username:username.value, currentscore:0, token:'', highScore:0})
    store.dispatch("fetchUsers")
    store.dispatch("checkExistingUser")
    store.commit("setQuestionOptions", {amount:noOfQuestions.value, category:category.value, difficulty:difficulty.value})
    store.dispatch("fetchQuestions")
    router.push('/questions')
}
</script>

<template>
<!-- Say a welcoming message and promt for username and what questions the user wants -->
    <h2>Welcome to the Trivia App</h2>
    <form @submit.prevent="onSubmit">
        <fieldset>
            <p>Please enter your username:</p>
            <input v-model="username">
        </fieldset>

        <fieldset class="start-selectors">
            <div id="start-selector">
            <p>Select Difficulty</p>
            <input type="radio" value="easy" v-model="difficulty" checked="checked">
            <label for="easy">Easy</label>
            <input type="radio" value="hard" v-model="difficulty">
            <label for="hard">Hard</label>
            </div>

            <div id="start-selector">
            <p>Choose amount of questions</p>
            <input type="radio" value="5" v-model="noOfQuestions" checked="checked">
            <label for="5">5</label>
            <input type="radio" value="10" v-model="noOfQuestions">
            <label for="10">10</label>
            <input type="radio" value="15" v-model="noOfQuestions">
            <label for="15">15</label>
            <input type="radio" value="20" v-model="noOfQuestions">
            <label for="20">20</label>
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
            </div>
        </fieldset>
        <fieldset>
            <br>
            <button type="submit">Start Quizzing</button>
        </fieldset>

    </form>

</template>

<style scoped>
/* A bouncing title along with layout of selector environment */
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
