// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyCZCR5mTjTlzy86hMyvps1-JcrDc015NxQ",
  authDomain: "peterpan-blog.firebaseapp.com",
  databaseURL: "https://peterpan-blog-default-rtdb.firebaseio.com",
  projectId: "peterpan-blog",
  storageBucket: "peterpan-blog.appspot.com",
  messagingSenderId: "197533149903",
  appId: "1:197533149903:web:3c1bfd52341862301265ba",
  measurementId: "G-J945YQEGKW",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
