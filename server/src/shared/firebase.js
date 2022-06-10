const firebase = require('firebase/app');
require('firebase/firestore');
require('firebase/auth');

module.exports.initializeFirebase = app => {
  const firebaseConfig = app.get('firebase');

  firebase.initializeApp(firebaseConfig);
  firebase.auth().useDeviceLanguage();
  return firebase;
};

module.exports.getFirebase = () => firebase;
