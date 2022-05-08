import React from "react"
import Start from "../src/components/Start"
import Questions from "../src/components/Questions"
import "../src/style.css"
import { nanoid } from "nanoid"

export default function App() {

    const [allQuestions, setAllQuestions] = React.useState([])
    const [renderQuiz, setRenderQuiz] = React.useState(false)
    const [isUserPrefChosen, setIsUserPrefChosen] = React.useState(false)
    const [fetchErr, setFetchErr] = React.useState(null)
    const [trackScore, setTrackScore] = React.useState(0)
    const [gameOver, setGameOver] = React.useState(false)
    const [formData, setFormData] = React.useState({
        quizCategory: 0,
        quizDifficulty: "easy"
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
            const response = await fetch(`https://opentdb.com/api.php?amount=5&category=${formData.quizCategory}&difficulty=${formData.quizDifficulty}`)
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
        formData.quizCategory !== 0 ? setRenderQuiz(true) 
        : setIsUserPrefChosen(prevState => !prevState)
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

        setGameOver(true)
    }

    console.log(trackScore)

    function restartGame() {
        window.location.reload(true)
    }

    const startPage = (
        <Start handleChange = { handleChange } 
        formData = { formData } startQuiz = { startQuiz } 
        isUserPrefChosen = { isUserPrefChosen }/>
    )

    const allRenderedQuestions = allQuestions.map(item => {
        return < Questions 
        isGameOver = { gameOver } handleSelectAnswer = { handleSelectAnswer } 
        question = { item.question } questionId = { item.questionId } 
        questionHeld = { item.questionIsHeld } answers = { item.allAnswers } 
        correctAnswer = { item.correct_answer } />
    })

    const questionsSection = (
        <section className="questions-section">
            { allRenderedQuestions }
        </section>
    )

    const resultsSection = (
        <div className="button--results-container">
            <h2 className="final-results">You scored {trackScore}/5 correct answers</h2>
            <button className="submit-btn" onClick = { restartGame } >Play Again</button>
        </div>
    )

    const checkResultsAction = (
        <div className="button--results-container">
            <button className="submit-btn checkAnswers" onClick = { checkAnswers } >Check answers</button>
        </div>
    )

    return (
        <main>
            <div className="app-container">
                { !renderQuiz && startPage }
                { renderQuiz && questionsSection }
                { renderQuiz &&  (gameOver ? resultsSection : checkResultsAction) }
            </div>
        </main>
    )
}