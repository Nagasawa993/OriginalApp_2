// Top.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Top.css";

const Top = () => {
  const navigate = useNavigate();

  // クイズページへの遷移処理
  const handleStartQuiz = () => {
    navigate("/quiz");
  };
  // 予習用サイトへの遷移処理
  const handleGoToGlossary = () => {
    window.open("https://www.mod.go.jp/j/press/shiritai/glossary.html", "_blank");
  };

  const handleGoToSaiyouCheck = () => {
    window.open("https://bouei-web-saiyou-check.jp/trial/", "_blank");
  };

  return (
    <div className="top-container">
      {/* ヘッダーセクション */}
      <header className="top-header">
        <h1 className="top-title">予備時の座学</h1>
        <p className="top-subtitle">知識を試そう！</p>
      </header>

      {/* メインコンテンツ */}
      <main className="top-main">
        <div className="top-content">
          <div className="welcome-section">
            <h2 className="welcome-title">ようこそ！</h2>
            <p className="welcome-description">
              このアプリケーションでは、軍事に関する様々な問題にチャレンジできます。<br />
              準備ができたら下のボタンを押してクイズを開始しましょう！
            </p>
          </div>

          <div className="start-section">
            <button 
              onClick={handleStartQuiz} 
              className="start-button"
            >
              <span className="start-button-text">クイズを開始する</span>
              <span className="start-button-icon">🚀</span>
            </button>
          </div>

          {/* 機能説明セクション */}
          <div className="features-section">
            {/* <h3 className="features-title">外部サイトリンク</h3> */}
            <div className="features-grid">
              <div className="feature-card" onClick={handleGoToGlossary}>
                <div className="feature-icon">📝</div>
                <h4>防衛省・自衛隊の用語集</h4>
                <p>用語を確認して理解を深めましょう</p>
              </div>
              <div className="feature-card" onClick={handleGoToSaiyouCheck}>
                <div className="feature-icon">💪</div>
                <h4>自衛官に興味がある方</h4>
                <p>自衛官採用Ｗｅｂ試験の練習用サイト</p>
              </div>
              {/* <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h4>進捗管理</h4>
                <p>問題の進行状況を確認</p>
              </div> */}
            </div>
          </div>

        </div>
      </main>

      {/* フッター */}
      <footer className="top-footer">
        <p>&copy; 2025 クイズアプリケーション</p>
      </footer>
    </div>
  );
};

export default Top;
