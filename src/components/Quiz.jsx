import { useState, useCallback } from "react";
import QUESTIONS from "../questions.js"
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {
    const [answers, setAnswers] = useState([]);

    const activeQuestionIndex = answers.length;
    const quizIsCompleted = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswers = useCallback(function handleSelectAnswers(answer) {
        setAnswers((prevAnswers) => {
            return [...prevAnswers, answer]
        });
    }, []);

    const onTimeout = useCallback(function onTimeout() {
        handleSelectAnswers(null)
    }, [handleSelectAnswers])

    if (quizIsCompleted) {
        return (
            <Summary userAnswers={answers} />
        )
    }

    return (
        <>
            <div id="quiz">
            <Question
                key={activeQuestionIndex}
                questionIndex={activeQuestionIndex}
                onSelectAnswer={handleSelectAnswers}
                onSkipAnswer={onTimeout}
            />
            </div>
        </>
    )
}