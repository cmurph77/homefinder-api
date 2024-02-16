import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyASBSx5xqW2vKkrj5Tch2J2ILcovWBBhy0",
  authDomain: "homefinder-e48bb.firebaseapp.com",
  projectId: "homefinder-e48bb",
  storageBucket: "homefinder-e48bb.appspot.com",
  messagingSenderId: "924463218735",
  appId: "1:924463218735:web:14ae64942c97a9ec8bc6da"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)