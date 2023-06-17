/* eslint-disable no-undef */

import { Configuration, OpenAIApi } from "openai";
const openAiConf = new Configuration({
  apiKey: process.env.REACT_APP_API_KEY,
});
const openAI = new OpenAIApi(openAiConf);

exports.handler = async function (event) {
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
    const conversationArr = JSON.parse(event.body);

    const response = await openAI.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: conversationArr,
    });
    const dataFromOpenAi = JSON.stringify(response.data.choices[0].message);

    return {
      statusCode: 200,
      headers,
      body: dataFromOpenAi,
    };
  }
};

// /* eslint-disable no-undef */
// import { Configuration, OpenAIApi } from "openai";

// const openAiConf = new Configuration({
//   apiKey: process.env.REACT_APP_API_KEY,
// });

// const openai = new OpenAIApi(openAiConf);

// exports.handler = async function (event) {
//   const headers = {
//     "Access-Control-Allow-Origin": "http://localhost:8888",
//     "Access-Control-Allow-Headers": "Content-Type",
//     "Access-Control-Allow-Methods": "GET, POST, OPTIONS, DELETE, HEAD,",
//     "Access-Control-Max-Age": "86400",
//   };

//   if (event.httpMethod === "OPTIONS") {
//     return {
//       statusCode: 200,
//       headers,
//       body: "This was a preflight call!",
//     };
//   } else if (event.httpMethod === "POST") {
//     const conversationArray = JSON.parse(event.body);
//     const response = await openai.createChatCompletion({
//       model: "gtp-3.5-turbo",
//       messages: conversationArray,
//     });
//     const dataDesdeOpenAI = JSON.stringify(response.data.choices[0].message);

//     return {
//       statusCode: 200,
//       headers,
//       body: dataDesdeOpenAI,
//     };
//   }
// };
