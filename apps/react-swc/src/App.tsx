import { useState } from "react";
// import Editor from "rich-markdown";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [data, setData] = useState("你好");

  return (
    <div className="App">
      <div>
        
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      {/* <Editor value={data} onChange={setData} /> */}
    </div>
  );
}

export default App;
