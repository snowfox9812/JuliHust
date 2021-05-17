import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyD7NbBFAtr19ZDJhkqZtma_RV8FiVot9vE',
    authDomain: 'julihust-fd92d.firebaseapp.com',
    databaseURL: 'https://julihust-fd92d-default-rtdb.firebaseio.com/',
    projectId: "julihust-fd92d",
    storageBucket: "julihust-fd92d.appspot.com",
    messagingSenderId: '178151491782',
    appId: 'insert yours: 1:1234:web:ee873bd1234c0deb7eba61ce',
    appId: '1:178151491782:web:c2b7a1e641c4f6c9bd6fc7',
    measurementId: 'G-S1RXCQDYTM'
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };