import firebase from 'firebase/app';
import 'firebase/auth'; // for authentication
// import 'firebase/storage';     // for storage
// import 'firebase/database';    // for realtime database
// import 'firebase/firestore';   // for cloud firestore
// import 'firebase/messaging';   // for cloud messaging
// import 'firebase/functions';   // for cloud functions

// Configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: 'crypto-tracker-9b91a.firebaseapp.com',
  projectId: 'crypto-tracker-9b91a',
  storageBucket: 'crypto-tracker-9b91a.appspot.com',
  messagingSenderId: '43309707962',
  appId: '1:43309707962:web:84d0d33d26b12d6f7c8883',
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
export default fire;
