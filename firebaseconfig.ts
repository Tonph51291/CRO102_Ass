import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth"; // Import từ firebase/auth
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
const firebaseConfig = {
  apiKey: "AIzaSyCQI7sVGYDclRwxeWIbe00PmFPaE59JbgM",
  authDomain: "lab7-cro103.firebaseapp.com",
  projectId: "lab7-cro103",
  storageBucket: "lab7-cro103.firebasestorage.app",
  messagingSenderId: "655220556429",
  appId: "1:655220556429:web:4c253a8dbc201d58d058c4",
  measurementId: "G-DPCSBY598C",
};

// Khởi tạo Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);

// Khởi tạo Auth với AsyncStorage
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage), // Dùng getReactNativePersistence từ firebase/auth
});

// Khởi tạo Firestore và Storage
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const STORAGE = getStorage(FIREBASE_APP);
