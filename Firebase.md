# Firebase Authentication

### Add a Bootfile
https://quasar.dev/quasar-cli/cli-documentation/boot-files#Usage-of-boot-files  
A bootfile runs code before the app is instanziated.  
```bash
quasar new boot <name>  
```
This command creates a new file in: ```/src/boot/<name>.js```.  
#### quasar.conf.js  
Added firebase to the boot array in quasar.conf.js  
```js
boot: [
    'firebase',
    'i18n',
    'axios'
],
``` 
### Install the firebase npm package 
```bash
npm install --save firebase
```
https://firebase.google.com/docs/web/setup?authuser=0#add-sdks-initialize
#### firebase.js
Delete all the text in firebase.js and add:  
```js
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from 'firebase/app'

// Add the Firebase services that you want to use
import 'firebase/auth'
import 'firebase/firestore'
```
Then add your config from firebase to firebase.js.  
```js
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
firebase.initializeApp(firebaseConfig)
```
To get access to the auth api you have to add this.  
```js
const firebaseApp = firebase.initializeApp(firebaseConfig)
const firebaseAuth = firebaseApp.auth()

export { firebaseAuth }
```
#### firebase.js looks like this.
```js
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
```
### Create a new store
1. Call it auth.js and add state, mutations,actions and getters.  
2. Import the store in the index.js file.  
### Register User
##### In the Store auth.js Add This
```js
import { firebaseAuth } from 'boot/firebase'  

const actions = {
  async registerUser ({ commit }, payload) {
    try {
      const response = await firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
      console.log('response: ', response)
    } catch (error) {
      console.log('error.message: ', error.message)
    }
  },
  
}
```
##### In LoginAndRegister.vue Add
In the script tag import mapActions ```import { mapActions } from 'vuex'```  
In methods add ```...mapActions('auth', ['registerUser']),```  
In the submit method in the else part add this ```this.registerUser(this.formData)```  
### Login User
##### In the Store auth.js Add This
```js
const actions = {
async loginUser ({ commit }, payload) {
    try {
      const response = await firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
      console.log('response: ', response)
    } catch (error) {
      console.log('error.message: ', error.message)
    }
  }
}
##### In LoginAndRegister.vue Add
In methods add ```...mapActions('auth', ['registerUser', 'loginUser]),```  
In the submit method in the login part add this ```this.loginUser(this.formData)```
```
### Logout Button
##### In the Store auth.js Add This
```js
const state = {
  loggedIn: false
}
```
##### In mutations in the auth.js store add this
```js
const mutations = {
  setLoggedIn (state, value) {
    state.loggedIn = value
  }
}
```
### State for logout button
We want to set the state to false for the logout button every time we enter the page. We can do this in app.vue with mount.  
```js
<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script >
import { mapActions } from 'vuex'

export default {
  name: 'App',
  methods: {
    ...mapActions('auth', ['loggedInOrLoggedOut'])
  },
  mounted () {
    this.loggedInOrLoggedOut()
  }
}
</script>
```
#### Create Action, mutation and state in auth.js
##### Action
```js
loggedInOrLoggedOut ({ commit }) {
  firebaseAuth.onAuthStateChanged(function (user) {
    if (user) {
      commit('setLoggedIn', true)
    } else {
      commit('setLoggedIn', false)
    }
  })
}
```
##### Mutation
```js
setLoggedIn (state, value) {
  this.loggedIn = value
}
```
##### State
```js
loggedIn: false
```
### Add a Logout Button
##### In index.vue add a button
```js
<q-btn
  v-if='loggedIn'
  flat
  icon-rigth='account_circle'
  label='Logout'
  class="absolute-rigth"
/>
```
Also in index.vue add this:  
```js
import { mapState } from 'vuex'

computed: {
  ...mapState('auth', ['loggedIn'])
}
```
### Log The User Out
##### Create a logout action in the auth store
```js
logoutUser () {
  firebaseAuth.signOut()
}
```
##### Import the logoutUser action in index.vue
```js
import { mapState, mapActions } from 'vuex'

methods: {
  ...mapActions('auth', ['logoutUser'])
}
```
##### Add @click to the button
```js
<q-btn
  v-if='loggedIn'
  @click="logoutUser"
  flat
  icon-rigth='account_circle'
  label='Logout'
  class="absolute-rigth"
/>
```
### Redirect on Login/Logout
In the actions in the store auth.js change the loggedInOrLoggedOut action.  
```js
loggedInOrLoggedOut ({ commit }) {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        commit('setLoggedIn', true)
        this.$router.push('/')
      } else {
        commit('setLoggedIn', false)
        this.$router.replace('/auth') // Replace removes the users history.
      }
    })
  }
```
