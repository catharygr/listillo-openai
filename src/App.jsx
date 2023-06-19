import "./App.css";
import { conversacionesRef } from "../scripts/firebase";
import { push, get, remove } from "firebase/database";
import { useState } from "react";
import Login from "./componente/login";

// https://listillo-openai-caty-default-rtdb.europe-west1.firebasedatabase.app/ - Firebase

function App() {
  const [estaIniciado, setEstaIniciado] = useState(false);
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

  return (
    <main className="main-container">
      {!estaIniciado && <Login setEstaIniciado={setEstaIniciado} />}
      {estaIniciado && (
        <>
          <header className="header-container">
            <h1>Chatea con Listillo</h1>
            <button className="btn">Salir</button>
          </header>
          <section className="chat-container">
            <div className="chat-listillo">
              <p className="chat-listillo__content--text">
                Hola, soy Listillo, tu asistente personal. ¿En qué puedo
                ayudarte?
              </p>
              <div className="chat-listillo__avatar">
                <p>Me puedo sacar un moco</p>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}

export default App;
