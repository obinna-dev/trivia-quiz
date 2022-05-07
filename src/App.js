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
    // const [correctAnswersId, setCorrectAnswersId] = ([])
    const [userAnswers, setUserAnswers] = React.useState({})
    const [formData, setFormData] = React.useState({
        quizCategory: 0,
        quizDifficulty: ""
    })

    function handleSelectAnswer(event) {
        const {name, value, id} = event.target
        console.log(`user selected this answer ${value} to the question ${name}`)
        setUserAnswers(prevState => {
            return {...prevState,[name]: value}
        })
        // setAllQuestions(prevState => prevState.map(item => {
        //         item.allAnswers.map(answer => (
        //         answer.id === id && {...answer, isHeld: true}
        //     ))
        //      }
        //     ))
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
        // checkWrongAnswers()
        setAllQuestions(prevState => prevState.map(item => {
            const correctAnswer = item.allAnswers.map(answer => (
                answer.answer === item.correct_answer ? {...answer, isCorrect: true}
                : answer.isHeld && answer.answer !== item.correct_answer ? {...answer, isWrong: true}
                : {...answer}

                // : {...answer}
            ))
            return {...item, allAnswers: correctAnswer}
        }
        ))
    }

    function checkWrongAnswers() {
        // setAllQuestions(prevState => prevState.map(item => {
        //     const wrongAnswer = item.allAnswers.map(answer => (
        //         answer.isHeld && answer.answer !== item.correct_answer ? {...answer, isWrong: true}
        //         : {...answer}
        //     ))
        //     return {...item, allAnswers: wrongAnswer}
        // }
        // ))
    }

    // loop through answers in allAnswers.
    // if answer isHeld, then check the answer.id !== correct_answer id
    // if answer.id !== correct_answer id, then toggle answer.isWrong = true
    // use answer.isWrong = true to select CSS style in conditional



    function getCorrectAnswerId() {
        const correctAnswerId = []
        allQuestions.map(item => {
            item.allAnswers.map(answer => (
                item.correct_answer === answer.answer && correctAnswerId.push(answer.id)
        ))
        })
        const userAnswersArray = Object.values(userAnswers)
        const userGotRight = userAnswersArray.filter((obj) => correctAnswerId.indexOf(obj) !==-1)
        setTrackScore(userGotRight.length)
    }

    
    console.log(`User got ${trackScore} answers right`)
    // console.log(`these are the correct answers id ${correctAnswersId}`)

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