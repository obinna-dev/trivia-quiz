import React from "react"
import Questions from "../src/components/Questions"
import "../src/style.css"

export default function App() {

    

    const [questions, setQuestions] = React.useState([])
    console.log(questions)

    function fetchData() {
        console.log(`fetch data button working. Difficulty is ${formData.quizDifficulty} and category is ${formData.quizCategory}`)
        fetch(`https://opentdb.com/api.php?amount=10&category=20&difficulty=easy`)
        .then(res => res.json())
        .then(data => setQuestions(data))
        console.log(questions)
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

    return (
        <main>
            <div className="app-container">
                <section className="start-section">
                    <div className="header-image">
                        <h1>Obinna's Trivia Quiz</h1>
                        <p>Fun trivia games</p>
                    </div>
                    
                    <form>
                        <select 
                            id="quizCategory"
                            value={formData.quizCategory}
                            onChange={handleChange}
                            name="quizCategory"
                        >
                            <option value="">-- Choose category --</option>
                            <option value="9">General Knowledge</option>
                            <option value="10">Entertainment: Books</option>
                            <option value="11">Entertainment: Film</option>
                            <option value="12">Entertainment: Music</option>
                            <option value="13">Entertainment: Musicals and Theatres</option>
                            <option value="14">Entertainment: Television</option>
                            <option value="15">Video Games</option>
                            <option value="16">Board Games</option>
                            <option value="17">Science and Nature</option>
                            <option value="18">Science: Computers</option>
                            <option value="19">Science: Mathematics</option>
                            <option value="20">Mythology</option>
                            <option value="21">Sports</option>
                            <option value="22">Geography</option>
                            <option value="23">History</option>
                            <option value="24">Politics</option>
                            <option value="25">Arts</option>
                            <option value="26">Celebrities</option>
                            <option value="27">Animals</option>
                            <option value="28">Vehicles</option>
                            <option value="29">Entertainment: Comics</option>
                            <option value="30">Science: Gadgets</option>
                            <option value="31">Entertainment: Japanese Anime and Manga</option>
                            <option value="32">Entertainment: Cartoon and Animations</option>
                        </select>
                        <br />
                        <select 
                            id="quizDifficulty"
                            value={formData.quizDifficulty}
                            onChange={handleChange}
                            name="quizDifficulty"
                        >
                            <option value="">-- Choose difficulty --</option>
                            <option value="easy">Easy 😃</option>
                            <option value="medium">Medium 😅</option>
                            <option value="hard">Hard 🥵</option>
                        </select>
                    </form>

                    <button className="start-btn" onClick={fetchData}>Start quiz</button>
                </section>
                <p>Made with ❤️ by Obinna-Dev</p>
                {/* <Questions /> */}
            </div>
        </main>
    )
}