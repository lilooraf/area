// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { getFirebase } = require('../shared/firebase');

// eslint-disable-next-line no-unused-vars
module.exports = (_options = {}) => {
  return async context => {
    const { id: collection } = context;
    const firebase = getFirebase();

    const db = firebase.firestore();
    const userUid = firebase.auth().currentUser.uid;
    const userCollection = db.collection('users').doc(`user-${userUid}`);

    const document = await userCollection.collection(collection).doc('auth').get();

    if (!document.data())
      throw new Error('Collection doesn\'t exist');

    return context;
  };
};
