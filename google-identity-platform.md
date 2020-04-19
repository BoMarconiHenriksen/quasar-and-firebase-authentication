# Google Identity Platform
https://cloud.google.com/identity-platform/docs/quickstart-email-password  
1. Start by enable Google Identity Platform in Google Cloud Platform.  
2. Create an email/password provider and then create a user with email and password.  
3. In GCP go to provider and on the top left click "Application setup details". Copy the config.  
4. Open firebase.js and paste the config.  
```js
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from 'firebase/app'

// Add the Firebase services that you want to use
import 'firebase/auth'
import 'firebase/firestore'

// Your web app's Firebase configuration
var config = {
  apiKey: Enter your API key,
  authDomain: Enter your authDomain
}
// Initialize Firebase
const firebaseApp = firebase.initializeApp(config)
const firebaseAuth = firebaseApp.auth()

export { firebaseAuth }
```
Run the application and test the login.  
### Multi-Tenancy in Google Cloud Platform


