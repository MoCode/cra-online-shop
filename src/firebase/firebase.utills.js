import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDXQ_sHlWcb-5hCSeqvovYkOGD-BvZYQh4",
  authDomain: "cra-db-1.firebaseapp.com",
  databaseURL: "https://cra-db-1.firebaseio.com",
  projectId: "cra-db-1",
  storageBucket: "cra-db-1.appspot.com",
  messagingSenderId: "747835238926",
  appId: "1:747835238926:web:47c198686b9acf245aea5f",
  measurementId: "G-BVTMS85608"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
