import React from "react"
import Start from "../src/components/Start"
import Questions from "../src/components/Questions"
import "../src/style.css"
import { nanoid } from "nanoid"

export default function App() {

    const [allQuestions, setAllQuestions] = React.useState([])
    const [renderQuiz, setRenderQuiz] = React.useState(false)
    const [fetchErr, setFetchErr] = React.useState(null)
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
                    questionIsHeld: false,
                    questionId: nanoid()
                }         
        })
        )
        setRenderQuiz(true)  
    }

    function handleSelectAnswer(id, questionId) {
        setAllQuestions(prevState => prevState.map(item => {
                const heldAns = item.allAnswers.map(answer => (
                answer.id === id ? {...answer, isHeld: !answer.isHeld}
                : {...answer, isHeld: false}
            ))
            return  item.questionId === questionId
                ? {...item, allAnswers: heldAns}
                : item
             }
            ))
    }
    
    function checkAnswers() {
        
        setAllQuestions(prevState => prevState.map(item => {
            item.allAnswers.map(answer => (
                answer.isHeld && (answer.answer === item.correct_answer)  
                && setTrackScore( prevState => prevState + 1)
        ))
            const correctAnswer = item.allAnswers.map(answer => (
                answer.answer === item.correct_answer ? {...answer, isCorrect: true}
                : answer.isHeld && answer.answer !== item.correct_answer ? {...answer, isWrong: true}
                : {...answer}
            ))
            return {...item, allAnswers: correctAnswer}
        }
        ))
        setAllQuestions(prevState => prevState.map(item => {
            const unHold = item.allAnswers.map(answer => (
                {...answer, isHeld: false}
            )) 
            return {...item, allAnswers: unHold}
        }))
    }

    console.log(trackScore)

    const allRenderedQuestions = allQuestions.map(item => {
        return <Questions handleSelectAnswer={handleSelectAnswer} question={item.question} questionId={item.questionId} questionHeld={item.questionIsHeld} answers={item.allAnswers} correctAnswer={item.correct_answer}/>
    })

    return (
        <main>
            <div className="app-container">
                { !renderQuiz && <Start handleChange={handleChange} formData={formData} startQuiz={startQuiz}/>}

                { renderQuiz &&
                    <section className="questions-section">
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