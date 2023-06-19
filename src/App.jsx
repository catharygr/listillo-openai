import "./App.css";
import { auth, conversacionesRef } from "../scripts/firebase";
import { push, get, remove } from "firebase/database";
import { useEffect, useState } from "react";
import Login from "./componente/login";
import { onAuthStateChanged, signOut } from "firebase/auth";

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

  function handleSalir() {
    signOut(auth)
      .then(setEstaIniciado(false))
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEstaIniciado(true);
      } else {
        setEstaIniciado(false);
      }
    });
  }, []);

  return (
    <main className="main-container">
      {!estaIniciado && <Login setEstaIniciado={setEstaIniciado} />}
      {estaIniciado && (
        <>
          <header className="header-container">
            <h1>Chatea con Listillo</h1>
            <button onClick={handleSalir} className="btn">
              Salir
            </button>
          </header>
          <section className="chat-container">
            <div className="chat-listillo">
              <p>
                Hola, soy Listillo, tu asistente personal. ¿En qué puedo
                ayudarte?
              </p>
            </div>
            <div className="chat-usuario">
              <p>Me puedo sacar un moco</p>
            </div>
          </section>
          <footer className="footer-container">
            <form className="enviar-mensaje-container">
              <input
                className="enviar-mensaje-input"
                type="text"
                placeholder="Escribe tu mensaje"
              />
              <button className="enviar-mensaje-btn">Enviar</button>
            </form>
          </footer>
        </>
      )}
    </main>
  );
}

export default App;
