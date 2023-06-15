import { Configuration, OpenAIApi } from "openai";

const openAiConf = new Configuration({
  apiKey: process.env.REACT_APP_API_KEY,
});


const openai = new OpenAIApi(openAiConf)

exports.handler = async function (event) {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      prompt: event.body,
      presence_penalty: 0,
			frequency_penalty: 0.3,




  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello World" }),
  };
};
