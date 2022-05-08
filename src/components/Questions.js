import { decode } from "html-entities"
import { nanoid } from "nanoid"

export default function Questions(props) {
    
    const allAnswers = props.answers.map(item => {
        return <p 
            key={nanoid()}
            className= {
            item.isHeld ? "answers selected" 
            : item.isCorrect ? "answers correct" 
            : item.isWrong ? "answers wrong"
            : !item.isCorrect && !item.isWrong && props.isGameOver ? "answers deactive" 
            : "answers"} 
            onClick={()=>{props.handleSelectAnswer(item.id, props.questionId)}}>{item.answer}</p>
    })

    return (
            <div className="question-container">
                <h3 className="question">{decode(props.question)}</h3>
                <div className="answers-container">
                    {decode(allAnswers)}
                </div>
                <hr />
            </div>
    )
}