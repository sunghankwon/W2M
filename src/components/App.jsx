import { Routes, Route } from "react-router-dom";

import Header from "./Header";
import DocxUploader from "./DocxUploader";
import MarkdownEditor from "./MarkdownEditor";

function App() {
  return (
    <div className="flex flex-col items-center w-full max-w-screen-lg mx-auto">
      <Header />
      <Routes>
        <Route path="/" exact element={<DocxUploader />} />
        <Route path="/convert-markdown" exact element={<MarkdownEditor />} />
      </Routes>
    </div>
  );
}

export default App;
