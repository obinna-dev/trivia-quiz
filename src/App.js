import Start from "../src/components/Start"
import Questions from "../src/components/Questions"
import "../src/style.css"

export default function App() {
    return (
        <main>
            <div className="app-container">
                <div className="blob-mask">
                    <div className="yellow-blob"></div>
                    <div className="blue-blob"></div>
                    <h1>This is App comp.</h1>
                    <Start />
                    <Questions />
                </div>
                
            </div>
            
        </main>
    )
}