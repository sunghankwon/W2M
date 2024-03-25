import { Routes, Route } from "react-router-dom";

import Header from "./Header";
import DocxUploader from "./DocxUploader";
import MarkdownConvert from "./MarkdownConvert";

function App() {
  return (
    <div className="flex flex-col items-center w-full max-w-screen-xl mx-auto">
      <Header />
      <Routes>
        <Route path="/" exact element={<DocxUploader />} />
        <Route path="/convert-markdown" exact element={<MarkdownConvert />} />
      </Routes>
    </div>
  );
}

export default App;
