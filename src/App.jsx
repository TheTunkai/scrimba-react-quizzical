import {useEffect, useState} from "react";
import Start from "./components/pages/Start";
import GameScreen from "./components/pages/GameScreen.jsx";

function App() {
    const [gameStarted, setGameStarted] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [gameFinished, setGameFinished] = useState(false);

    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5&category=17&difficulty=medium&type=multiple')
            .then(response => response.json())
            .then(json => {
                setQuestions(generateQuestionObjects(json.results));
            });
    }, [gameStarted]);

    function generateQuestionObjects(questionsData) {
        return questionsData.map((question, index) => {
            return ({
                id: "question-" + index,
                category: question.category,
                question: question.question,
                answers: [question.correct_answer, ...question.incorrect_answers].map((answer, index) => {
                    return ({id: "answer-" + index, answer: answer, selected: false})
                }).sort((answer1, answer2) => {
                    return Math.ceil(Math.random() * 4 - Math.ceil(Math.random() * 4));
                }),
                correctAnswer: question.correct_answer,
                isCorrect: false,
            })
        });
    }

    function handleAnswerSelect(answerId, questionId) {
        setQuestions(prevQuestions => {
            return (prevQuestions.map(question => {
                    return !(question.id === questionId) ? question : ({
                        ...question,
                        answers: question.answers.map(answer => {
                                return !(answer.id === answerId) ? {...answer, selected: false} : {
                                    ...answer,
                                    selected: !answer.selected,
                                }
                            }
                        )
                    })
                })
            )
        })
    }

    function handleCheckAnswers() {
        questions.forEach(question => {
            const selectedAnswer = question.answers.find(answer => answer.selected) || null;
            console.log(selectedAnswer)
            question.isCorrect = (selectedAnswer ? selectedAnswer.answer : '') === question.correctAnswer;
        })
        setCorrectAnswers(getCorrectAnswers());
        console.log(correctAnswers);
        setGameFinished(true);
    }

    function handleGameReset() {
        setGameStarted(false);
        setGameFinished(false);
    }

    function getCorrectAnswers() {
        return questions.filter(question => question.isCorrect).length;
    }

    return (
        <div className="flex items-center">
            {!gameStarted && <Start handleGameStart={() => setGameStarted(true)}/>}
            {gameStarted && <GameScreen questions={questions} handleAnswerSelect={handleAnswerSelect}
                                        handleCheckAnswers={handleCheckAnswers} isGameFinished={gameFinished}
                                        handleReset={handleGameReset} correctAnswers={correctAnswers}/>}
        </div>
    );
}

export default App;
