import {getAuth,GoogleAuthProvider} from "firebase/auth"

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC9SmkoSICmdfuKs2CYaGOv5swrCdMzeu0" ,


  authDomain: "loginonecart-9b025.firebaseapp.com",
  projectId: "loginonecart-9b025",
  storageBucket: "loginonecart-9b025.firebasestorage.app",
  messagingSenderId: "499203079729",
  appId: "1:499203079729:web:2d2e4dd9b95c1230449f10"
};

const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const provider= new GoogleAuthProvider()
export{auth,provider}