const { getFirebase } = require('../../shared/firebase');

/* eslint-disable no-unused-vars */
exports.UserCollection = class UserCollection {
  constructor (options) {
    this.options = options || {};
  }

  // can't fetch every collection from another collection without its name (e.g. users>user-*uid*>Spotify)
  async find (_params) {
    throw new Error('Request deprecated');
  }

  // GET http://localhost:8080/collection/{collection}
  async get (collection, _params) {
    const firebase = getFirebase();
    const db = firebase.firestore();
    const userUid = firebase.auth().currentUser.uid;
    const userCollection = db.collection('users').doc(`user-${userUid}`);

    const document = await userCollection.collection(collection).doc('auth').get();

    return { success: true, document: document.data() };
  }

  // POST http://localhost:8080/collection/
  /*
    req:
      {
        "service": "Spotify",
        "access_token": "ezfezlmo6576czlkcez=LMLK",
        "refresh_token": "lkddlezdzeLKEZLK"
      }
  */
  async create(data, params) {
    console.log("value =====>", data);
    if (Array.isArray(data))
      return Promise.all(data.map(current => this.create(current, params)));

    const firebase = getFirebase();
    const db = firebase.firestore();
    const userUid = firebase.auth().currentUser.uid;
    const userCollection = db.collection('users').doc(`user-${userUid}`);

    await userCollection.collection(data.service).doc('auth').set({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      status: false
    });

    return { success: true, data };
  }

  // PUT http://localhost:8080/collection/{collection}
  /*

  req:
    {
      "access_token": "ezfezlmo6576czlkcez=LMLK",
      "refresh_token": "lkddlezdzeLKEZLK",
      "status": true or false
    }

  */
  async update (collection, data, _params) {
    const firebase = getFirebase();
    const db = firebase.firestore();
    const userUid = firebase.auth().currentUser.uid;
    const userCollection = db.collection('users').doc(`user-${userUid}`);

    return await userCollection.collection(collection).doc('auth').update({
      ...data
    }).then(() => {
      return { success: true, data };
    });

  }

  async patch (_id, _data, _params) {
    throw new Error('Request deprecated');
  }

  // DELETE http://localhost:8080/services-available/{collection}
  async remove (collection, _params) {
    const firebase = getFirebase();
    const db = firebase.firestore();
    const userUid = firebase.auth().currentUser.uid;
    const userCollection = db.collection('users').doc(`user-${userUid}`);

    await userCollection.collection(collection).doc('auth').delete();
    return { success: true };
  }
};
