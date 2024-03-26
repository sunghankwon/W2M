import { Routes, Route } from "react-router-dom";

import Header from "./Header";
import DocxUploader from "./DocxUploader";
import MarkdownConvert from "./MarkdownConvert";

function App() {
  return (
    <div className="flex flex-col items-center w-full mx-auto max-w-screen-2\xl">
      <Header />
      <Routes>
        <Route path="/" exact element={<DocxUploader />} />
        <Route path="/convert-markdown" exact element={<MarkdownConvert />} />
      </Routes>
    </div>
  );
}

export default App;
