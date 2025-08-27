import { Routes, Route } from "react-router-dom";
import Top from "./Top";
import Quiz from "./Quiz";
import "./App.css";

const App = () => {
  return (
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
  );
};

export default App;
