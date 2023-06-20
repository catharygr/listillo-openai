import "./App.css";
import { auth, conversacionesRef } from "../scripts/firebase";
import { push, get, remove } from "firebase/database";
import { useEffect, useState } from "react";
import Login from "./componente/login";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { onValue } from "firebase/database";

// https://listillo-openai-caty-default-rtdb.europe-west1.firebasedatabase.app/ - Firebase

function App() {
  const [estaIniciado, setEstaIniciado] = useState(false);
  const [mensajesFormulario, setMensajesFormulario] = useState("");
  const [conversacion, setConversacion] = useState([]);

  const objectoInstrucciones = {
    role: "system",
    content: "Soy una asistente muy útil siempre dispuesto a ayudar.",
  };

  // Función para enviar mensajes a la base de datos
  function handleEnviarMensaje(e) {
    e.preventDefault();
    push(conversacionesRef, {
      role: "user",
      content: mensajesFormulario,
    });
    get(conversacionesRef).then((snapshot) => {
      const conversacionesArray1 = Object.values(snapshot.val());
      setConversacion(conversacionesArray1);
      const conversacionesArray2 = Object.values(snapshot.val());
      conversacionesArray2.unshift(objectoInstrucciones);
      getOpenAIData(conversacionesArray2);
    });
    setMensajesFormulario("");
  }

  // Función para obtener los datos de OpenAI
  async function getOpenAIData(conversacionArray) {
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
    push(conversacionesRef, data);
  }

  // Función para salir de la aplicación
  function handleSalir() {
    signOut(auth)
      .then(setEstaIniciado(false))
      .catch((error) => {
        console.log(error);
      });
  }

  // Comprobar si el usuario está logueado
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEstaIniciado(true);
      } else {
        setEstaIniciado(false);
      }
    });
  }, []);

  // Cargar mensajes de la base de datos al iniciar la aplicación
  useEffect(() => {
    const cancelarOnValue = onValue(conversacionesRef, (snapshot) => {
      if (snapshot.val()) {
        const conversacionesArray = Object.values(snapshot.val());
        setConversacion(conversacionesArray);
      } else {
        setConversacion([]);
      }
    });
    return () => cancelarOnValue();
  }, []);

  //  Mapear los mensajes de la base de datosq
  const mapeo = conversacion.map((mensaje, index) => {
    return (
      <div key={index} className="chat-usuario">
        <p>{mensaje.content}</p>
      </div>
    );
  });

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
            {mapeo}
          </section>
          <footer className="footer-container">
            <form
              onSubmit={handleEnviarMensaje}
              className="enviar-mensaje-container"
            >
              <input
                className="enviar-mensaje-input"
                type="text"
                placeholder="Escribe tu mensaje"
                value={mensajesFormulario}
                onChange={(e) => setMensajesFormulario(e.target.value)}
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
