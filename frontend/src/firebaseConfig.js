// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmHnIdoGdt6imeNqwxYag251xmGzJOtxI",
  authDomain: "storybook-2660a.firebaseapp.com",
  projectId: "storybook-2660a",
  storageBucket: "storybook-2660a.appspot.com",
  messagingSenderId: "313457323570",
  appId: "1:313457323570:web:ae78d9c442692b9813d62b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export default storage;