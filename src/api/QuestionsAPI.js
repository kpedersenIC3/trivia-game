const createQuestionsURL = (amount,category,difficulty) => {
    const urlbase = "https://opentdb.com/api.php?"
    let url = urlbase + "amount=" + amount

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

const getQuestions = () => {}
