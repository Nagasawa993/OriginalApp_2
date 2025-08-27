// App.jsx - ルーティング管理
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Top from "./Top";
import Quiz from "./Quiz";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter basename="/OriginalApp_2">   // basenameを追記
      <div className="app">
        <Routes>
          {/* TOPページのルート */}
          <Route path="/" element={<Top />} />
          
          {/* クイズページのルート */}
          <Route path="/quiz" element={<Quiz />} />
          
          {/* 存在しないパスの場合はTOPページにリダイレクト */}
          <Route path="*" element={<Top />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
