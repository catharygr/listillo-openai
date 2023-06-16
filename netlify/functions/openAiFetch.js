/* eslint-disable no-undef */
import { Configuration, OpenAIApi } from "openai";

const openAiConf = new Configuration({
  apiKey: process.env.REACT_APP_API_KEY,
});

const openai = new OpenAIApi(openAiConf);

// exports.handler = async function (event) {
//   const { text } = JSON.parse(event.body);
//   const gptResponse = await openai.complete({
//     model: "gtp-3.5 turbo",
//     prompt: text,
//     maxTokens: 5,
//     temperature: 0.9,
//     topP: 1,
//     presencePenalty: 0,
//     frequencyPenalty: 0,
//     bestOf: 1,
//     n: 1,
//     stream: false,
//     stop: ["\n"],
//   });
//   console.log(gptResponse);

//   return {
//     statusCode: 200,
//     body: JSON.stringify({ message: "Hello World" }),
//   };
// };

exports.handler = async function (event) {
  const conversationArray = JSON.parse(event.body);
  const conv = JSON.stringify(conversationArray);

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
    return {
      statusCode: 200,
      headers, // body: JSON.stringify({ message: "Hello World" }),
      body: conv,
    };
  }
};
