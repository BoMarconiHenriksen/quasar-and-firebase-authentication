// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from 'firebase/app'

// Add the Firebase services that you want to use
import 'firebase/auth'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'Enter your API Key',
  authDomain: 'Enter your authDomain',
  databaseURL: 'Enter your databaseURL',
  projectId: 'Enter your projectId',
  storageBucket: 'Enter your storageBucket',
  messagingSenderId: 'Enter your messagingSenderId',
  appId: 'Enter your appId',
  measurementId: 'Enter your measurementId'
}
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)
const firebaseAuth = firebaseApp.auth()

export { firebaseAuth }
