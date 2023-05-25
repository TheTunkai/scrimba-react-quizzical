import {useEffect, useState} from "react";

export default function Question(props) {
    const domParser = new DOMParser();
    const answerElements = props.questionObject.answers.map((answer, index) => <span
        key={answer.id}
        onClick={() => {
            if (!props.isGameFinished) {
                props.handleAnswerSelect(answer.id, props.parentId)
            }
        }}
        className={`${answer.selected && props.isGameFinished && !props.questionObject.isCorrect ? 'bg-red-100' : ''}${answer.selected && !props.isGameFinished ? 'bg-indigo-100' : ''} ${props.isGameFinished && (answer.answer === props.questionObject.correctAnswer) ? 'bg-emerald-100' : ''} font-medium border-2 border-indigo-800 border-opacity-60 rounded-xl px-3 py-1 hover:bg-indigo-100 cursor-pointer transition duration-75}`}>{domParser.parseFromString(answer.answer, 'text/html').body.textContent}</span>);


    return (
        <div className="max-w-3xl">
            <h3 className="font-semibold text-xl mb-4">{domParser.parseFromString(props.questionObject.question, 'text/html').body.textContent}</h3>
            <div className="flex gap-3">{answerElements}</div>
            {props.isGameFinished &&
                <p className={`${props.questionObject.isCorrect ? 'text-emerald-600' : 'text-red-600'} mt-2 flex justify-end`}>{props.questionObject.isCorrect ? 'Correct' : 'Wrong'}</p>}
            <hr className="border border-opacity-30 mt-4"/>
        </div>
    )
}