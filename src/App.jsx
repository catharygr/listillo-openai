import "./App.css";

function App() {
  const url =
    "https://listillo-openai.netlify.app/.netlify/functions/openAiFetch";

  async function getOpenAIData() {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: "Hola Sasa",
    });
    const data = await response.json();
    console.log(data);
  }
  getOpenAIData();
  return <h1>Hola mundo</h1>;
}

export default App;
