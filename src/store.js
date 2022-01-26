import { createStore } from "vuex";


const apiURL = 'https://kasper-assignment-api.herokuapp.com/trivia'
const apiKey = 'fl9zG/Otu0SSGR4XDJwGbA=='

 
// *************************************************************

function AppendNewUserAPI (username, token) {
    fetch(`${apiURL}`, {
        method: 'POST',
        headers: {
            'X-API-Key': apiKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            username: username, 
            highScore: 0,
            token: token,
            currentscore: 0
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Could not create new user')
        }

        return response.json()
    })
    .then(newUser => {
        // newUser is the new user with an id
    })
    .catch(error => {
    })
}


function updateHighScore (userId, currentscore)
{
    
    fetch(`${apiURL}/${userId}`, {
        method: 'PATCH', // NB: Set method to PATCH
        headers: {
        'X-API-Key': apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        // Provide new highScore to add to user with id 1
        highScore: currentscore  
    })
})
.then(response => {
  if (!response.ok) {
    throw new Error('Could not update high score')
  }
  return response.json()
})
.then(updatedUser => {
  // updatedUser is the user with the Patched data
})
.catch(error => {
})

}



// Retrive a new session token for API
async function getNewTokenSessionAPI(){
    try {
        const response = await fetch('https://opentdb.com/api_token.php?command=request')
        const posts = await response.json()
        return posts
    }
    catch(error){
        console.error("Something went wrong", error)
    }
}


// Gets questions for the current user with their token,
// resets token if current user has seen all question in the asked for category
async function getQuestionsAPI(url, token){
    try {
        let response = await fetch(url)
        let posts = await response.json()
        // If user has seen all questions with given constrains (category, difficulty, etc.)
        if(response.response_code !== 0){
            // reset token
            await fetch("https://opentdb.com/api_token.php?command=reset&token="+token)
            // fetch questions again
            response = await fetch(url)
            posts = await response.json()
        }
        return posts
    }
    catch(error){
        console.error("Something went wrong, function getQuestionsAPI(url, token)", error)
    }
}

// Generates URL with API requests with the specifications selected by user
const createQuestionsURL = (amount, category, difficulty, sessionToken) => {
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
    url += "&difficulty=" + difficulty + "&token=" + sessionToken

    return url;
}

// ********************************************************************





//Store that has all the functionality used in the app
const store = createStore({
    state: {
        currentuser: {
            username: '',
            currentscore: 0,
            highScore: 0,
            token: '',
            id: NaN
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
            state.currentuser = {...payload}
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
        async setHighScore({ commit } ) {
            updateHighScore(store.getters.getCurrentUser.id, store.getters.getCurrentUser.currentscore)
        },
        async setCurrentQuestion({ commit }) {
            commit('setCurrentQuestion', 0)
        },
        async fetchUsers({ commit }) {
            const response = await fetch(apiURL)
            const users = await response.json()
            commit('setUserList', users)
        },
        checkExistingUser ({ commit }) {
            let registeredUsers = store.getters.getUserList
            let currentUser = store.getters.getCurrentUser
            
            let indexCount = 0
            let existingUserId = -1
            for(const registerUser of registeredUsers){
                if(currentUser.username === registerUser.username)
                {
                    existingUserId = registerUser.id
                }
                indexCount++
            }
            // new user 
            if(existingUserId === -1)
            {
                let newToken = ''
                getNewTokenSessionAPI()
                .then(response => newToken = response.token)
                .then(newToken => store.commit("setCurrentUser", {id: indexCount, username: currentUser.username, currentscore:0, token: newToken, highScore:0}))
                .then(newToken => AppendNewUserAPI (currentUser.username, store.getters.getCurrentUser.token))
            }
            // existing user
            else
            {   
                // Stores values from users API in currentUser
                store.commit("setCurrentUser", registeredUsers[existingUserId - 1])
            }
        },
        fetchQuestions({commit}) {   
            let url = ''
            const currentUser = store.getters.getCurrentUser
            const options = store.getters.getQuestionOptions
           
            url = createQuestionsURL(
                options.amount, options.category, options.difficulty, store.getters.getCurrentUser.token
                )
            getQuestionsAPI(url, store.getters.getCurrentUser.token)
            .then(response2 => commit('setQuestions', response2))
        }
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