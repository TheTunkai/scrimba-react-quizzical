import {useEffect, useState} from "react";
import Question from "../Question";

export default function GameScreen(props) {
    const questionElements = props.questions.map(question => <Question key={question.id}
                                                                       parentId={question.id}
                                                                       questionObject={question}
                                                                       handleAnswerSelect={props.handleAnswerSelect}
                                                                       isGameFinished={props.isGameFinished}/>);

    return (
        <div
            className="p-10 flex flex-col gap-y-12 bg-white bg-opacity-40 rounded-md">
            <div
                className="flex flex-col gap-6">
                {questionElements}
            </div>
            {!props.isGameFinished ? <button
                className="mx-auto py-3 px-5 text-md bg-indigo-800 rounded-xl hover:bg-indigo-600 transition duration-75 text-white"
                onClick={props.handleCheckAnswers}>Check
                Answers
            </button> : <div className="flex flex-row items-center justify-end gap-8"><p className="font-semibold text-lg">You have {props.correctAnswers}/5 correct answers</p><button
                className="py-3 px-5 text-md bg-indigo-800 rounded-xl hover:bg-indigo-600 transition duration-75 text-white"
                onClick={props.handleReset}>Restart Game</button></div>}
        </div>
    )
}