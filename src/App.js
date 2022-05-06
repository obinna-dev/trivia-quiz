import React from "react"
import Start from "../src/components/Start"
import Questions from "../src/components/Questions"
import "../src/style.css"
import { nanoid } from "nanoid"

export default function App() {

    const [allQuestions, setAllQuestions] = React.useState([])
    const [renderQuiz, setRenderQuiz] = React.useState(false)
    const [fetchErr, setFetchErr] = React.useState(null)
    // const [disabled, setDisabled] = React.useState(false)
    const [trackScore, setTrackScore] = React.useState(0)
    const [formData, setFormData] = React.useState({
        quizCategory: 0,
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
            // console.log(allQuestions)
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
                    isWrong: false,
                    isHeld: false,
                    disabled: false,
                    id: nanoid()
                })
                )
                return {
                    question: item.question,
                    correct_answer: item.correct_answer,
                    allAnswers: allAnswers,
                    questionId: nanoid()
                }         
        })
        )
        setRenderQuiz(true)  
    }

    function checkAnswers() {
        setAllQuestions(prevState => prevState.map(item => {
            const correctAnswer = item.allAnswers.map(answer => (
                answer.answer === item.correct_answer ? {...answer, isCorrect: true}
                : {...answer, isWrong: true}
            ))
            return {...item, allAnswers: correctAnswer}
        }
        ))
        console.log("examiner button clicked")
    }

    function selectAnswer(id){
        console.log(`user selected this answer ${id}`)
        setAllQuestions(prevState => prevState.map(item => {
            const allAnswers = item.allAnswers.map(answer => (
                answer.id === id ? {...answer, isHeld: true}
                // : answer
                : {...answer, isHeld: false, disabled: true}
            )
            )
            return {...item, allAnswers: allAnswers}
        }))
    }

    //Temp button to check state without triggering startquiz function again
    function checkConsole() {
        console.log(allQuestions)
    }

    const allRenderedQuestions = allQuestions.map(item => {
        return <Questions question={item.question} answers={item.allAnswers} correctAnswer={item.correct_answer} selectAnswer={selectAnswer}/>
    })

    return (
        <main>
            <div className="app-container">
                { !renderQuiz && <Start handleChange={handleChange} formData={formData} startQuiz={startQuiz}/>}

                { renderQuiz &&
                    <section className="questions-section">
                        <button onClick={checkConsole}>console.log</button>
                        {allRenderedQuestions}
                    </section>
                }
                <div className="button--results-container">
                    <h2 className="final-results">You scored 3/5 correct answers</h2>
                    <button className="submit-btn" onClick={checkAnswers}>Check answers</button>
                </div>
            </div>
        </main>
    )
}