/* eslint-disable no-undef */
// import { Configuration, OpenAIApi } from "openai";

// const openAiConf = new Configuration({
//   apiKey: process.env.REACT_APP_API_KEY,
// });

// const openai = new OpenAIApi(openAiConf);
// let dataDesdeOpenAI = [];

exports.handler = async function (event) {
  // const response = await openai.createChatCompletion({
  //   model: "gtp-3.5 turbo",
  //   mesagges: conversationArray,
  // });
  // dataDesdeOpenAI = JSON.stringify(response);

  const headers = {
    "Access-Control-Allow-Origin": "http://localhost:8888",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, DELETE, HEAD,",
    "Access-Control-Max-Age": "86400",
  };

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "This was a preflight call!",
    };
  } else if (event.httpMethod === "POST") {
    const conversationArray = JSON.parse(event.body);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(conversationArray),
    };
  }
};
