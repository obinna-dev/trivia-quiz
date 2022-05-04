export default function Questions() {
    return (
        <section>
            <div className="question-container">
                <h3 className="question">How would one say goodbye in Spanish?</h3>
                <div className="answers-container">
                    <p className="answers selected">Adiós</p>
                    <p className="answers correct">Hola</p>
                    <p className="answers deactive">Au Revoir</p>
                    <p className="answers wrong">Salir</p>
                </div>
                <hr />
            </div>
            <div className="question-container">
                <h3 className="question">Which best selling toy of 1983 caused hysteria, resulting in riots breaking in stores?</h3>
                <div className="answers-container">
                    <p className="answers selected">Cabbage Patch Kids</p>
                    <p className="answers correct">Transformers</p>
                    <p className="answers deactive">Care Bears</p>
                    <p className="answers wrong">Rubik's Cube</p>
                </div>
                <hr />
            </div>
            <div className="question-container">
                <h3 className="question">How would one say goodbye in Spanish?</h3>
                <div className="answers-container">
                    <p className="answers selected">Adiós</p>
                    <p className="answers correct">Hola</p>
                    <p className="answers deactive">Au Revoir</p>
                    <p className="answers wrong">Salir</p>
                </div>
                <hr />
            </div>
            <div className="question-container">
                <h3 className="question">Which best selling toy of 1983 caused hysteria, resulting in riots breaking in stores?</h3>
                <div className="answers-container">
                    <p className="answers selected">Cabbage Patch Kids</p>
                    <p className="answers correct">Transformers</p>
                    <p className="answers deactive">Care Bears</p>
                    <p className="answers wrong">Rubik's Cube</p>
                </div>
                <hr />
            </div>
            <div className="button--results-container">
                <h2 className="final-results">You scored 3/5 correct answers</h2>
                <button className="submit-btn">Check answers</button>
            </div>
        </section>
    )
}