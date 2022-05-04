import React from "react"
import Start from "../src/components/Start"
import Questions from "../src/components/Questions"
import "../src/style.css"

export default function App() {

    const [questions, setQuestions] = React.useState([])
    const [fetchErr, setFetchErr] = React.useState(null)

    const fetchData = async () => {
        try {
            const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${formData.quizCategory}&difficulty=${formData.quizDifficulty}`)
            if (!response.ok) throw Error("Oops! 🙊 Something went wrong. Did not receive expected data from the API")
            const data = await response.json()
            // console.log(data)
            setQuestions(data)
            setFetchErr(null)
            console.log(questions)
        } catch (err) {
            setFetchErr(err.message)
        }
        console.log("button clicked")
    }

    const [formData, setFormData] = React.useState({
            quizCategory: "", 
            quizDifficulty: ""
    })

    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => {
            return {...prevFormData, [name]: value}
        })
    }

    let theQuestion = ""
    let answersArr = []

    function generateQuiz() {
        questions.map(question => {
            theQuestion = question.question
            answersArr = [question.correct_answer, question.incorrect_answers[0], question.incorrect_answers[1], question.incorrect_answers[2]]
        })
        console.log(answersArr)
    }

    generateQuiz()
        


        // <Questions question={question.question}
        // correctAnswer={question.correct_answer}
        // incorrectAnswer1={question.incorrect_answers[0]}/> 
        // <div className="question-container">
        //         <h3 className="question">{question}</h3>
        //         <div className="answers-container">
        //             <p className="answers selected">Adiós</p>
        //             <p className="answers correct">Hola</p>
        //             <p className="answers deactive">Au Revoir</p>
        //             <p className="answers wrong">Salir</p>
        //         </div>
        //         <hr />
        //     </div>

    return (
        <main>
            <div className="app-container">
                <Start handleChange={handleChange} formData={formData} fetchData={fetchData}/>
                <Questions />
            </div>
        </main>
    )
}