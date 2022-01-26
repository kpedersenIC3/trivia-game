import { createStore } from "vuex";
//Store that has all the functionality used in the app
const store = createStore({
    state: {
        currentuser: {
            username: '',
            currentscore: '',
        },
        userlist: {

        },
        questionoptions : {

        },
        questions: {

        },
        currentquestion: {

        },
    },
    mutations: {
        setCurrentUser: (state, payload) => {
            state.currentuser = payload
        },
        setUserList: (state, payload) => {
            state.userlist = payload
        },
        setQuestionOptions: (state, payload) => {
            state.questionoptions = payload
        },
        setQuestions: (state, payload) => {
            state.questions = {
                ...payload
            }
        },
        updateCurrentScore: (state,payload) => {
            state.currentuser.currentscore += payload
        }
    },
    actions: {
        async setCurrentQuestion({ commit }) {
            commit('setCurrentQuestion', 0)
        },
        async fetchUsers({ commit }) {
            const response = await fetch("https://kasper-assignment-api.herokuapp.com/trivia")
            const users = await response.json()
            commit('setUserList', users)
        },
        async fetchQuestions({ commit }) {
            const createQuestionsURL = (amount,category,difficulty) => {
                const urlbase = "https://opentdb.com/api.php?"
                let url = urlbase + "amount=" + amount + "&type=multiple"
            
                switch (category){
                    case "General Knowledge":
                        url += "&category=9"
                        break
                    case "Science and Nature":
                        url += "&category=17"
                        break
                    case "Sports":
                        url += "&category=21"
                        break
                    case "History":
                        url += "&category=23"
                        break
                }
            
                url += "&difficulty=" + difficulty
                return url;
            }

            const options = store.getters.getQuestionOptions
            console.log(createQuestionsURL(options.amount,options.category,options.difficulty))
            const response = await fetch(createQuestionsURL(options.amount,options.category,options.difficulty))
            const questions = await response.json()
            commit('setQuestions', questions)
        },
    },
    getters: {
        getUserList: (state) => {return state.userlist},
        getCurrentUser: (state) => {return state.currentuser},
        getQuestionOptions: (state) => {return state.questionoptions},
        getQuestions: (state) => {return state.questions.results},
        getNoOfQuestions : (state) => {return state.questionoptions.amount}
    }
})

export default store