// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  doc,
  deleteDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCjwJljOSyxQAGNQGEElSlqenfsy4k0Sn8",
  authDomain: "artisan-staging-4b2c0.firebaseapp.com",
  databaseURL:
    "https://artisan-staging-4b2c0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "artisan-staging-4b2c0",
  storageBucket: "artisan-staging-4b2c0.appspot.com",
  messagingSenderId: "1078192214484",
  appId: "1:1078192214484:web:1cf31e074399f55a150641",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const addDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return true;
  } catch (error) {
    console.log(error);
  }
};

const getDocuments = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = querySnapshot.docs.map((doc) => doc.data());
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getDocumentsWithId = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = [];
    querySnapshot.docs.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getDocumentsInRealTime = (collectionName) => {
  try {
    const data = [];
    onSnapshot(collection(db, collectionName), (snapshot) => {
      snapshot.docs.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      console.log("real time data", data);
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const createEmailAndPassUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.log(error);
  }
};

const resetPassword = async (email) => {
  try {
    const response = await sendPasswordResetEmail(auth, email);
    console.log(response);
    return true;
  } catch (error) {
    console.log(error);
  }
};

const deleteDocument = async (document, key) => {
  try {
    const docRef = doc(db, document, key);
    await deleteDoc(docRef);
    console.log(docRef);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const updateDocument = async (document, id, update) => {
  try {
    const docRef = doc(db, document, id);
    await updateDoc(docRef, update);
    console.log(docRef);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export {
  addDocument,
  getDocuments,
  createEmailAndPassUser,
  resetPassword,
  getDocumentsWithId,
  deleteDocument,
  getDocumentsInRealTime,
  updateDocument,
};
