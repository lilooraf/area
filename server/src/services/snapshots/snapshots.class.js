
const { getFirebase } = require('../../shared/firebase');
const { v4: uuidv4 } = require('uuid');

/* eslint-disable no-unused-vars */
exports.Snapshots = class Snapshots {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    const firebase = getFirebase();
    const db = firebase.firestore();
    const userUid = firebase.auth().currentUser.uid;

    return db.collection('snapshots').get()
      .then(documents => {
        let data = [];

        documents.forEach(document => {
          if (document.id.includes(userUid))
            data.push(document.data());
        });

        return { success: true, data };
      })
      .catch(error => { return { success: true, error }; });
  }

  async get (id, params) {
    const firebase = getFirebase();
    const db = firebase.firestore();

    return db.collection('snapshots').doc(id).get()
      .then(document => { return  { success: true, data: document.data() }; })
      .catch(error => { return { success: false, error }; });
  }

  async create (data, params) {
    if (Array.isArray(data))
      return Promise.all(data.map(current => this.create(current, params)));

    const firebase = getFirebase();
    const db = firebase.firestore();
    const userUid = firebase.auth().currentUser.uid;
    const uid = uuidv4();

    await db.collection('snapshots').doc(uid).set({ user: userUid, ...data });
    return { success: true, data: { user: userUid, uid, ...data } };
  }

  async update (id, data, params) {
    const firebase = getFirebase();
    const db = firebase.firestore();
    const userUid = firebase.auth().currentUser.uid;

    await db.collection('snapshots').doc(id).update(data);
    return { success: true, data: { user: userUid, ...data } };
  }

  async patch (id, data, params) {
    throw new Error('Request deprecated');
  }

  async remove (id, params) {
    const firebase = getFirebase();
    const db = firebase.firestore();

    await db.collection('snapshots').doc(id).delete();
    return { success: true };
  }
};
