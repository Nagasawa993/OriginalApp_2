// Quiz.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [result, setResult] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);

  // クイズ全件取得
  useEffect(() => {
    const fetchQuestions = async () => {
      const querySnapshot = await getDocs(collection(db, "Quiz"));
      const loadedQuestions = [];

      querySnapshot.forEach((doc) => {
        loadedQuestions.push(doc.data());
      });

      // クイズ順に並べ替え（必要に応じて）
      loadedQuestions.sort((a, b) =>
        a.text.localeCompare(b.text) // またはdoc.idで並び替え
      );

      setQuestions(loadedQuestions);
    };

    fetchQuestions();
  }, []);

  const handleSelect = (choice) => {
    setSelectedChoice(choice);
    setIsAnswered(false);
    setResult("");
  };

  const handleAnswer = () => {
    const currentQuestion = questions[currentIndex];
    if (selectedChoice === currentQuestion.correctAnswer) {
      setResult("正解");
    } else {
      setResult("不正解");
    }
    setIsAnswered(true);
  };

  const handleNext = () => {
    setSelectedChoice(null);
    setResult("");
    setIsAnswered(false);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  if (questions.length === 0) return <p>読み込み中...</p>;
  if (currentIndex >= questions.length) return <p>全ての問題が終了しました。</p>;

  const currentQuestion = questions[currentIndex];

  return (
    <div>
      <h2>問題 {currentIndex + 1}</h2>
      <p>{currentQuestion.text}</p>
      {currentQuestion.choices.map((choice, index) => (
        <button
          key={index}
          onClick={() => handleSelect(choice)}
          style={{
            margin: "5px",
            backgroundColor: selectedChoice === choice ? "#add8e6" : "",
          }}
        >
          {choice}
        </button>
      ))}

      <div style={{ marginTop: "10px" }}>
        <button
          onClick={handleAnswer}
          disabled={!selectedChoice || isAnswered}
        >
          解答する
        </button>
      </div>

      {isAnswered && (
        <>
          <p style={{ fontWeight: "bold" }}>{result}</p>
          {currentIndex < questions.length - 1 ? (
            <button onClick={handleNext}>次の問題へ</button>
          ) : (
            <p>これで最後の問題です。</p>
          )}
        </>
      )}
    </div>
  );
};

export default Quiz;
