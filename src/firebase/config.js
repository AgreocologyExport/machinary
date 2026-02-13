import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAzAgDNz-mAxls4dtY8MYZ-RLUXZ_6iVlg",
  authDomain: "agreocology.firebaseapp.com",
  databaseURL: "https://agreocology-default-rtdb.firebaseio.com",
  projectId: "agreocology",
  storageBucket: "agreocology.firebasestorage.app",
  messagingSenderId: "872924261934",
  appId: "1:872924261934:web:af4ed161985ddcc67d39bf",
  measurementId: "G-4FVQG1LQFB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Use initializeFirestore for more advanced configuration
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
  // Force long polling to avoid connection hangups in restricted networks
  experimentalForceLongPolling: true
});

export const database = getDatabase(app);
export const storage = getStorage(app);

