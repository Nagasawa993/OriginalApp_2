// Quiz.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import "./Quiz.css"; // CSSファイルをインポート

const Quiz = () => {
  const navigate = useNavigate(); // ページ遷移用のフック
  
  // 状態管理
  const [questions, setQuestions] = useState([]); // Firestoreから取得したクイズデータの配列
  const [currentIndex, setCurrentIndex] = useState(0); // 現在表示している問題のインデックス
  const [selectedChoice, setSelectedChoice] = useState(null); // ユーザーが選択した回答
  const [result, setResult] = useState(""); // 正解・不正解の結果テキスト
  const [isAnswered, setIsAnswered] = useState(false); // 回答済みかどうかのフラグ
  const [loading, setLoading] = useState(true); // データ読み込み状態
  const [error, setError] = useState(null); // エラー状態

  // コンポーネント初回レンダリング時にFirestoreからクイズデータを取得
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        console.log("Firestoreからデータを取得中..."); // デバッグログ
        
        // Firestoreの"Quiz"コレクションから全てのドキュメントを取得
        const querySnapshot = await getDocs(collection(db, "Quiz"));
        console.log("取得したドキュメント数:", querySnapshot.size); // デバッグログ
        
        const loadedQuestions = [];

        // 取得したドキュメントから問題データを抽出
        querySnapshot.forEach((doc) => {
          console.log("ドキュメントID:", doc.id, "データ:", doc.data()); // デバッグログ
          loadedQuestions.push(doc.data());
        });

        console.log("読み込んだ問題数:", loadedQuestions.length); // デバッグログ

        // クイズを問題文のアルファベット順に並べ替え（問題の順序を統一）
        loadedQuestions.sort((a, b) =>
          a.text.localeCompare(b.text) // またはdoc.idで並び替え
        );

        // 取得・整理したクイズデータを状態にセット
        setQuestions(loadedQuestions);
        console.log("状態にセットしました"); // デバッグログ
        setLoading(false); // 読み込み完了
      } catch (error) {
        console.error("Firestoreからのデータ取得エラー:", error);
        setError(error.message); // エラー状態をセット
        setLoading(false); // 読み込み完了（エラーでも）
      }
    };

    // 非同期でクイズデータを取得
    fetchQuestions();
  }, []); // 空の依存配列で初回レンダリング時のみ実行

  // 選択肢がクリックされたときの処理
  const handleSelect = (choice) => {
    setSelectedChoice(choice); // クリックされた選択肢を状態に保存
    setIsAnswered(false); // 回答状態をリセット
    setResult(""); // 前回の結果表示をクリア
  };

  // 「解答する」ボタンがクリックされたときの処理
  const handleAnswer = () => {
    const currentQuestion = questions[currentIndex]; // 現在の問題データを取得
    
    // 選択された回答と正解を比較
    if (selectedChoice === currentQuestion.correctAnswer) {
      setResult("正解"); // 正解の場合
    } else {
      setResult("不正解"); // 不正解の場合
    }
    setIsAnswered(true); // 回答済みフラグを立てる
  };

  // 「次の問題へ」ボタンがクリックされたときの処理
  const handleNext = () => {
    setSelectedChoice(null); // 選択状態をリセット
    setResult(""); // 結果表示をクリア
    setIsAnswered(false); // 回答状態をリセット
    setCurrentIndex((prevIndex) => prevIndex + 1); // 次の問題のインデックスに進む
  };

  // TOPページに戻る処理
  const handleBackToTop = () => {
    navigate("/");
  };

  // 条件分岐によるレンダリング制御
  if (loading) return <p className="loading-message">読み込み中...</p>; // データ読み込み中の表示
  if (error) return <p className="error-message">エラーが発生しました: {error}</p>; // エラー表示
  if (questions.length === 0) return <p className="no-data-message">クイズデータが見つかりませんでした。</p>; // データなしの表示
  if (currentIndex >= questions.length) {
    return (
      <div className="quiz-container">
        <div className="quiz-header">
          <button onClick={handleBackToTop} className="back-button">
            ← TOPに戻る
          </button>
        </div>
        <div className="quiz-completed">
          <h2 className="completed-title">🎉 お疲れ様でした！</h2>
          <p className="completed-message">全ての問題が終了しました。</p>
          <button onClick={handleBackToTop} className="return-top-button">
            TOPページに戻る
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex]; // 現在表示する問題データ

  return (
    <div className="quiz-container">
      {/* ヘッダー部分 - 戻るボタン */}
      <div className="quiz-header">
        <button onClick={handleBackToTop} className="back-button">
          ← TOPに戻る
        </button>
      </div>

      {/* 問題番号の表示 */}
      <h2 className="quiz-title">問題 {currentIndex + 1}</h2>
      
      {/* 問題文の表示 */}
      <p className="quiz-question">{currentQuestion.text}</p>
      
      {/* 選択肢ボタンの動的生成 */}
      {currentQuestion.choices.map((choice, index) => (
        <button
          key={index}
          onClick={() => handleSelect(choice)}
          className={`choice-button ${selectedChoice === choice ? 'selected' : ''}`}
        >
          {choice}
        </button>
      ))}

      {/* 解答ボタン */}
      <div className="answer-button-container">
        <button
          onClick={handleAnswer}
          disabled={!selectedChoice || isAnswered} // 選択肢未選択または回答済みの場合は無効化
          className="answer-button"
        >
          解答する
        </button>
      </div>

      {/* 回答後の結果表示エリア */}
      {isAnswered && (
        <>
          {/* 正解・不正解の結果表示 */}
          <p className={`result-text ${result === '正解' ? 'correct' : 'incorrect'}`}>
            {result}
          </p>
          
          {/* 次の問題への遷移または終了メッセージ */}
          {currentIndex < questions.length - 1 ? (
            <button onClick={handleNext} className="next-button">
              次の問題へ
            </button>
          ) : (
            <p className="end-message">これで最後の問題です。</p>
          )}
        </>
      )}
    </div>
  );
};

export default Quiz;
