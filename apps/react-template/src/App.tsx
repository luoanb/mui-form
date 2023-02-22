import { useEffect, useState } from "react";
import xx from "typescript-template"
// import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState("你好");
  useEffect(()=>{
    console.log("xx",xx);
  },[])
  return (
    <div className="App">
    </div>
  );
}

export default App;
