export default function Questions(props) {
    
    const allAnswers = props.answers.map(item => {
        // const styles = 
        //     className: 
        // return <p className= {item.isHeld ? "answers selected" : "answers"} onClick={()=>{props.selectAnswer(item.id)}}>{item.answer}</p>
        return <p className= {
            item.isHeld ? "answers selected" 
            : item.isCorrect ? "answers correct" 
            : item.isWrong ? "answers wrong" 
            : "answers"} 
            onClick={()=>{props.handleSelectAnswer(item.id, props.questionId)}}>{item.answer}</p>

            // return <p className= {
            //     item.isHeld && props.questionHeld ? "answers selected" 
            //     : item.isCorrect ? "answers correct" 
            //     : item.isWrong ? "answers wrong" 
            //     : "answers"} 
            //     onClick={()=>{props.selectAnswer(item.id, props.questionId)}}>{item.answer}</p>

        // return  <div className= {item.isHeld ? "radio selected" 
        //                 : item.isCorrect ? "radio correct"
        //                 : item.isWrong ? "radio wrong"
        //                 : "radio"
        //                 }> 
        //             <input 
        //                 type="radio"
        //                 id={item.id}
        //                 questionid={props.questionId}
        //                 name={props.question}
        //                 value={item.id}
        //                 disabled = {item.disabled}
        //                 onClick={props.handleSelectAnswer} />
        //             <label htmlFor={item.id}>{item.answer}</label>
        //         </div>

        // return <div className= "radio" style = {styles}>                    
        //             <input 
        //             type="radio"
        //             id={item.id}
        //             name={props.question}
        //             value={item.answer}
        //             onClick={()=>{props.selectAnswer(item.id)}} />
        //             <label htmlFor={item.id}>{item.answer}</label>
        //         </div>
    })

    // console.log(props.answers)

    return (
            <div className="question-container">
                <h3 className="question">{props.question}</h3>
                <div className="answers-container">
                    {allAnswers}
                    <p><em>{props.correctAnswer}</em></p>
                </div>
                <hr />
            </div>
    )
}



{/* <div className="question-container">
                <h3 className="question">Which best selling toy of 1983 caused hysteria, resulting in riots breaking in stores?</h3>
                <div className="answers-container">
                    <p className="answers selected">Cabbage Patch Kids</p>
                    <p className="answers correct">Transformers</p>
                    <p className="answers deactive">Care Bears</p>
                    <p className="answers wrong">Rubik's Cube</p>
                </div>
                <hr />
            </div> */}