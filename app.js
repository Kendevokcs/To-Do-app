const firebaseConfig = {
  apiKey: "AIzaSyC7fMGHjNsg8RwQ_b60K00YRfn3QudgJqc",
  authDomain: "beadando-apfl.firebaseapp.com",
  projectId: "beadando-apfl",
  storageBucket: "beadando-apfl.firebasestorage.app",
  messagingSenderId: "703398267373",
  appId: "1:703398267373:web:06635b9b1042ff8dbd3fe4",
  measurementId: "G-CBM66TM8J1"
};

// firebase inicializálása
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
