import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth"; // Import từ firebase/auth
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAkAYErUzcisGpGZqgvT55UUoR_V66rvXQ",
  authDomain: "ass-cro102.firebaseapp.com",
  projectId: "ass-cro102",
  storageBucket: "ass-cro102.firebasestorage.app",
  messagingSenderId: "696338982277",
  appId: "1:696338982277:web:b4bcaf9b4b6311356d90ec",
  measurementId: "G-ZVSV3NJ6BK",
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
