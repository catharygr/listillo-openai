import "./App.css";
import { conversacionesRef } from "../scripts/firebase";
import { push, get, remove } from "firebase/database";

// https://listillo-openai-caty-default-rtdb.europe-west1.firebasedatabase.app/ - Firebase

function App() {
  const objectoInstrucciones = [
    {
      role: "user",
      content: "Cómo ha sido tu día hoy?.",
    },
  ];

  async function getOpenAIData() {
    const url =
      "https://listillo-openai.netlify.app/.netlify/functions/openAiFetch";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(conversacionArray),
    });
    const data = await response.json();
    console.log(data);
  }
  // getOpenAIData();

  return <h1>Hello word</h1>;
}

export default App;
