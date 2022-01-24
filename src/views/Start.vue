<script setup>
import { useRouter } from 'vue-router';
import { reactive, ref, computed } from 'vue';
import { onMounted } from 'vue';
import { useStore } from 'vuex';

const router = useRouter()
const store = useStore()

onMounted(() => {
    store.dispatch("fetchUsers")
})


const username = ref('')
const difficulty = ref('')
const noOfQuestions = ref('')
const category = ref('')

const onSubmit = () => {
    store.commit("setCurrentUser", {username:username.value, currentscore:0})
    store.commit("setQuestionOptions", {amount:noOfQuestions.value, category:category.value, difficulty:difficulty.value})
    store.dispatch("fetchQuestions")
    router.push('/questions')
}
</script>

<template>
    <h2>Welcome to the Trivia App</h2>
    <form @submit.prevent="onSubmit">
        <fieldset>
            <p>Please enter your username:</p>
            <input v-model="username">
            <p>{{username}}</p>
            <br>
        </fieldset>

        <fieldset class="start-selectors">
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
        </fieldset>
        <fieldset>
            <br>
            <button type="submit">Submit</button>
        </fieldset>

    </form>

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
