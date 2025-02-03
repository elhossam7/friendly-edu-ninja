// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcNQcW9V9D8y1zwM5zKZ8G3kAiFqnjbRk",
  authDomain: "edumanager0.firebaseapp.com",
  projectId: "edumanager0",
  storageBucket: "edumanager0.firebasestorage.app",
  messagingSenderId: "975644455137",
  appId: "1:975644455137:web:9d8ab01324e49b788b87a0",
  measurementId: "G-SQK47K6KW2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
