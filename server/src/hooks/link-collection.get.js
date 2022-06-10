// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
const { getFirebase } = require('../shared/firebase');

module.exports = (_options = {}) => {
  return async context => {
    const {id: uuid} = context;
    const firebase = getFirebase();
    const db = firebase.firestore();
    const userUid = firebase.auth().currentUser.uid;

    const data = await db.collection('links').doc(`${userUid}-${uuid}`).get();

    if (!data.data()) {
      throw new Error('This document doesn\'t exist');
    }
    return context;
  };
};
