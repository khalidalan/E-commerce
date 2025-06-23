import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDJBYmcAPBdKV-1b50rq5t2dFSGJwpvQ-U",
  authDomain: "exclusive-45a37.firebaseapp.com",
  projectId: "exclusive-45a37",
  storageBucket: "exclusive-45a37.firebasestorage.app",
  messagingSenderId: "670895482114",
  appId: "1:670895482114:web:65c00e518388d6f4250e1b",
  measurementId: "G-NXMN7L7LEW",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
