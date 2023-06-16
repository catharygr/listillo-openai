import "./App.css";

function App() {
  const conversacionArray = [
    {
      role: "system",
      content:
        "Tú eres un asistente virtual muy sabio que siempre estás dispuesto a ayudar",
    },
    {
      role: "user",
      content: "Cómo ha sido tu día hoy?.",
    },
  ];
  const url =
    "https://listillo-openai.netlify.app/.netlify/functions/openAiFetch";

  async function getOpenAIData() {
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
  getOpenAIData();
  return <h1>Hola mundo</h1>;
}

export default App;
