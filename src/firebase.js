import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCW_IjHQ0tpppwWi0Ja3mZqqRowqytpyvU",
  authDomain: "creditcard-86a4e.firebaseapp.com",
  projectId: "creditcard-86a4e",
  storageBucket: "creditcard-86a4e.appspot.com",
  messagingSenderId: "242263208010",
  appId: "1:242263208010:web:2bff95eb0c97f30711b6b3"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export {db};
