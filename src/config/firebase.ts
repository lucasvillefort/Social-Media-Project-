// Import the functions you need from the SDKs you need
//https://console.firebase.google.com/u/0/project/social-media-project-1ad53/overview

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBD97HqsuIf1PMOuM8_mgxGKKVW9-_PD5c",
  authDomain: "social-media-project-1ad53.firebaseapp.com",
  projectId: "social-media-project-1ad53",
  storageBucket: "social-media-project-1ad53.appspot.com",
  messagingSenderId: "1035720727368",
  appId: "1:1035720727368:web:b99f0abfeae106ed7e317d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
