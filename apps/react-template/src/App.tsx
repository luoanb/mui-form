import { useState } from "react";
import Editor from "rich-markdown-editor";

// import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState("你好");

  return (
    <div className="App">
      <Editor value={count} onChange={v=>setCount(v)} />
    </div>
  );
}

export default App;
