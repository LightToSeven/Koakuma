import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyC5HKLGWnhjn8Zu46jkc40Z7XGSPKoUGr0',
  authDomain: 'koakuma-60660.firebaseapp.com',
  databaseURL: 'https://koakuma-60660-default-rtdb.firebaseio.com',
  projectId: 'koakuma-60660',
  storageBucket: 'koakuma-60660.appspot.com',
  messagingSenderId: '23135029533',
  appId: '1:23135029533:web:8ef0da2f0bab0e72cbb9f4',
  measurementId: 'G-40JGMMDHV7'
}

initializeApp(firebaseConfig)
const firebaseAuth = getAuth()
// console.debug('firebaseAuth', firebaseAuth)

export { firebaseAuth }
