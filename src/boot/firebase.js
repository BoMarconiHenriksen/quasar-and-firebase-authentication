// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from 'firebase/app'

// Add the Firebase services that you want to use
import 'firebase/auth'
import 'firebase/firestore'

// Your web app's Firebase configuration
var config = {
  apiKey: Enter API key,
  authDomain: Enter authDomain
}
// Initialize Firebase
const firebaseApp = firebase.initializeApp(config)
const firebaseAuth = firebaseApp.auth()

export { firebaseAuth }
