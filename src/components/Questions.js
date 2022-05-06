export default function Questions(props) {

    const allAnswers = props.answers.map(item => {
        return <p className="answers selected">{item.answer}</p>
    })

    console.log(props.question)

    return (
            <div className="question-container">
                <h3 className="question">{props.question}</h3>
                <div className="answers-container">
                    {allAnswers}
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