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
    const [trackScore, setTrackScore] = React.useState([])
    const [userAnswers, setUserAnswers] = React.useState({})
    const [formData, setFormData] = React.useState({
        quizCategory: 0,
        quizDifficulty: ""
    })

    function handleSelectAnswer(event) {
        const {name, value} = event.target
        console.log(`user selected this answer ${value} to the question ${name}`)
        setUserAnswers(prevState => {
            return {...prevState,[name]: value}
        })
        console.log(userAnswers)
    }

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
                    questionIsHeld: false,
                    questionId: nanoid()
                }         
        })
        )
        setRenderQuiz(true)  
    }

    function checkAnswers() {
        getCorrectAnswerId()
        setAllQuestions(prevState => prevState.map(item => {
            const correctAnswer = item.allAnswers.map(answer => (
                answer.answer === item.correct_answer ? {...answer, isCorrect: true}
                : {...answer, isWrong: true}
            ))
            return {...item, allAnswers: correctAnswer}
        }
        ))
        console.log("examiner button clicked")
        console.log(correctAnswerId)
        console.log(userAnswersArray)
        console.log(userGotRight)
    }

    let correctAnswerId = []
    let userAnswersArray = []
    let userGotRight

    function getCorrectAnswerId() {
        allQuestions.map(item => {
            item.allAnswers.map(answer => (
                item.correct_answer === answer.answer && correctAnswerId.push(answer.id)
        ))
        })
        userAnswersArray = Object.values(userAnswers)
        userGotRight = userAnswersArray.filter((obj) => correctAnswerId.indexOf(obj) !==-1)
    }



    // function selectAnswer(id, questionId){
    //     console.log(`user selected this answer ${id} to the question ${questionId}`)
    //     setAllQuestions(prevState => prevState.map(item => {
    //             const allAnswers = item.allAnswers.map(answer => {
    //                 if (item.questionId === questionId && answer.id === id) {
    //                     return {...answer, isHeld: true}
    //                 } else return {...answer, isHeld: false}
    //                 // answer.id === id && item.questionId === questionId ? {...answer, isHeld: true}
    //                 // : answer
    //                 // : {...answer, isHeld: false, disabled: true}
    //                 // : answer.id !== id && item.questionId === questionId ? {...answer, isHeld: false, disabled: true}
    //             }
    //             )  
    //         return {...item, allAnswers: allAnswers}
    // }  
        
    //     ))
    
    // }

    //Temp button to check state without triggering startquiz function again
    function checkConsole() {
        console.log(allQuestions)
    }

    const allRenderedQuestions = allQuestions.map(item => {
        return <Questions handleSelectAnswer={handleSelectAnswer} question={item.question} questionId={item.questionId} questionHeld={item.questionIsHeld} answers={item.allAnswers} correctAnswer={item.correct_answer}/>
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