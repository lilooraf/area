// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
const { getFirebase } = require('../shared/firebase');

module.exports = (_options = {}) => {
  return async context => {
    const { id: document, data } = context;
    const firebase = getFirebase();
    const db = firebase.firestore();

    if (!data.name || !data.body)
      throw new Error('Your object must have those following property: \'name\' and \'body\'');
    const doc = await db.collection('services').doc(document).get();
    if (!doc.data())
      throw new Error('This document doesn\'t exist');
    return context;
  };
};
