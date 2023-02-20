// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCpj6cE9T9SE6yQxSDFmoEoufQvOnw-ZpA",
    authDomain: "netflix-clone-6d2d4.firebaseapp.com",
    projectId: "netflix-clone-6d2d4",
    storageBucket: "netflix-clone-6d2d4.appspot.com",
    messagingSenderId: "542647905981",
    appId: "1:542647905981:web:340576b9ff93b5db5cd1d4",
    measurementId: "G-0ENTQDZGRQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
