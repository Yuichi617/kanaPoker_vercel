import firebase from 'firebase/app'
import 'firebase/firestore'

let db;
let functions;

try {
    const config = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID
      };
    firebase.initializeApp(config);
    // Firestoreインスタンスを作成
    db = firebase.firestore();
    // Firebase functionsインスタンスを作成
    functions = firebase.functions();
  } catch (error) {
    console.log(error);
  }

  module.exports = {
    // 本来、initializeAppによる初期化は一度きりのため、
    // 初期化の結果のみを切り出してexportする
    db,
    functions,
  };