import React from "react"
import Start from "../src/components/Start"
import Questions from "../src/components/Questions"
import "../src/style.css"
import { nanoid } from "nanoid"

export default function App() {

    const [allQuestions, setAllQuestions] = React.useState([])
    const [renderQuiz, setRenderQuiz] = React.useState(false)
    const [fetchErr, setFetchErr] = React.useState(null)

    const [formData, setFormData] = React.useState({
        quizCategory: "",
        quizDifficulty: ""
    })

    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => {
            return {...prevFormData, [name]: value}
        })
        fetchData()
    }

    const fetchData = async () => {
        try {
            const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${formData.quizCategory}&difficulty=${formData.quizDifficulty}`)
            if (!response.ok) throw Error("Oops! 🙊 Something went wrong. Did not receive expected data from the API")
            const data = await response.json()
            setAllQuestions(data.results)
            setFetchErr(null)
            console.log(allQuestions)
        } catch (err) {
            setFetchErr(err.message)
        }   
    }

    function startQuiz() {
        setAllQuestions(prevState => prevState.map(item => {
                const answers = [...item.incorrect_answers]
                answers.unshift(item.correct_answer)
                const shuffledAnswers = answers.sort(() => Math.random() - 0.5)
                const allAnswers = shuffledAnswers.map(answer => ({
                    answer: answer,
                    isCorrect: false,
                    isHeld: false,
                    id: nanoid
                })
                )
                return {
                    question: item.question,
                    correct_answer: item.correct_answer,
                    allAnswers: allAnswers
                }         
        })
        )
        setRenderQuiz(prevState => true)
    }

    //Temp button to check state without triggering startquiz function again
    function checkConsole() {
        console.log(allQuestions)
    }

    const allRenderedQuestions = allQuestions.map(item => {
        return <Questions question={item.question} answers={item.allAnswers}/>
    })

    return (
        <main>
            <div className="app-container">
                <Start handleChange={handleChange} formData={formData} startQuiz={startQuiz}/>
                {/* <button onClick={checkConsole}>console.log</button> */}

                <section className="questions-section">
                    { renderQuiz && allRenderedQuestions }

                    <div className="button--results-container">
                        <h2 className="final-results">You scored 3/5 correct answers</h2>
                        <button className="submit-btn">Check answers</button>
                    </div>
                </section>
                
            </div>
        </main>
    )
}