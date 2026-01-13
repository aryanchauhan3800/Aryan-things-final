import React, { useState, useEffect } from 'react';
import { QuizData } from '../Data/Data';

// Helper function to shuffle the quiz data
const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
};

function Quiz() {
    const [shuffledQuizData, setShuffledQuizData] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [clickedOption, setClickedOption] = useState(0);
    const [showPartialResult, setShowPartialResult] = useState(false);
    const [showFinalResult, setShowFinalResult] = useState(false);

    useEffect(() => {

        const shuffledData = shuffleArray(QuizData);
        setShuffledQuizData(shuffledData);
    }, []);

    const changeQuestion = () => {
        updateScore();
        
        if ((currentQuestion + 1) % 10 === 0) {
            setShowPartialResult(true);
        } else if (currentQuestion < shuffledQuizData.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setClickedOption(0);
        } else {
            setShowFinalResult(true);
        }
    };

    const updateScore = () => {
        if (clickedOption === shuffledQuizData[currentQuestion].answer) {
            setScore(score + 1);
        }
    };

    const continueQuiz = () => {
        setShowPartialResult(false);
        setCurrentQuestion(currentQuestion + 1);
        setClickedOption(0);
    };

    const resetAll = () => {
        setShowFinalResult(false);
        setShowPartialResult(false);
        setCurrentQuestion(0);
        setClickedOption(0);
        setScore(0);
        // Reshuffle quiz data on reset
        const shuffledData = shuffleArray(QuizData);
        setShuffledQuizData(shuffledData);
    };

    return (
        <div
            className="bg-black h-screen text-white flex flex-row items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/031/690/160/non_2x/view-from-space-of-illuminated-earth-in-night-free-photo.jpg')` }} // Update with your image URL
        >
            <p className="text-gray lg:text-6xl md:text-5xl text-3xl lg:mb-0 mb-5 font-medium opacity-0 translate-y-20 transition-opacity duration-300 transform">
                Quiz APP
            </p>
            <div className="flex flex-col items-center gap-4  mr-[250px]">
                {showFinalResult ? (
                    <div className="text-center">
                        <h2 className="text-2xl mb-4">Final Quiz Results</h2>
                        <p className="mb-4">Your Final Score: {score} / {shuffledQuizData.length}</p>
                        <button 
                            onClick={resetAll} 
                            className="py-2 px-4 bg-black text-white rounded-lg hover:bg-green-600 transition duration-300 border-r-white border-r-8"
                        >
                            Try Again
                        </button>
                    </div>
                ) : showPartialResult ? (
                    <div className="text-center">
                        <h2 className="text-3xl mb-4">Partial Results</h2>
                        <p className="mb-4">Your Current Score: {score} / {currentQuestion + 1}</p>
                        <button 
                            onClick={continueQuiz} 
                            className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                        >
                            Continue Quiz
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="mb-4 text-white  text-3xl md:text-3xl font-semibold ">
                            <span id="question-number">{currentQuestion + 1}. </span>
                            <span id="question-txt">{shuffledQuizData[currentQuestion]?.question}</span>
                        </div>
                        <div className="flex flex-row items-center mb-4 gap-6  ">
                            {shuffledQuizData[currentQuestion]?.options.map((option, i) => {
                                return (
                                    <button
                                        className={`option-btn ${
                                            clickedOption === i + 1 ? 'bg-black' : 'bg-gray-800'
                                        } text-white border-none py-2 px-4 rounded-lg mb-2 cursor-pointer hover:text-white transition-all`}
                                        key={i}
                                        onClick={() => setClickedOption(i + 1)}
                                    >
                                        {option}
                                    </button>
                                );
                            })}
                        </div>
                        <button
                            type="button"
                            onClick={changeQuestion}
                            className="bg-black text-white py-2 px-6 rounded-lg hover:bg-zinc-800 transition duration-300 border-2 border-white"
                        >
                            Next
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Quiz;
