import React from "react"
import Questions from "../src/components/Questions"
import "../src/style.css"

export default function App() {

    

    const [questions, setQuestions] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(null)

    React.useEffect(()=>{getData()}, [])

    const getData = async () => {
        const response = await fetch("url")
        if (!response.ok) {
            throw new Error(`Oops! 🙊 Something went wrong. The HTTP error status is ${response.status}`)
        }
        let question = await response.json()



        // setQuestions(await response.json())
    }


    const [formData, setFormData] = React.useState({
            quizCategory: "", 
            quizDifficulty: ""
    })

    return (
        <main>
            <div className="app-container">
                <section className="start-section">
                    <h1>Obinna's Trivia Quiz</h1>
                    <form>
                        <label htmlFor="quizCategory">Select category</label>
                        <br />
                        <select 
                            id="favColor"
                            value={formData.quizCategory}
                            onChange={""}
                            name="quizCategory"
                        >
                            <option value="">-- Choose --</option>
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
                        <label htmlFor="quizCategory">Select difficulty</label>
                        <br />
                        <select 
                            id="favColor"
                            value={formData.quizCategory}
                            onChange={""}
                            name="quizCategory"
                        >
                            <option value="">-- Choose --</option>
                            <option value="easy">Easy 😃</option>
                            <option value="medium">Medium 😅</option>
                            <option value="hard">Hard 🥵</option>
                        </select>
                    </form>

                    <button className="start-btn">Start quiz</button>
                </section>
                {/* <Questions /> */}
            </div>
        </main>
    )
}