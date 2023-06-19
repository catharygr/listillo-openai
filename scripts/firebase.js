// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyArBNm3g4g7bTG0khz-V-yJzhDdJGpYvAQ",
  authDomain: "listillo-openai-caty.firebaseapp.com",
  projectId: "listillo-openai-caty",
  storageBucket: "listillo-openai-caty.appspot.com",
  messagingSenderId: "727968867652",
  appId: "1:727968867652:web:6b50f25a91704600ee6311",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Obtener la referencia a la base de datos
const db = getDatabase(app);
export const conversacionesRef = ref(db, "conversaciones");
