/* eslint-disable no-unused-vars */
const { v4: uuidv4 } = require('uuid');
const { getFirebase } = require('../../shared/firebase');
const SpotifyImpl = require('../../shared/externalServices/SpotifyImpl');

//uuidv4()

exports.LinkCollection = class LinkCollection {
  constructor (options) {
    this.options = options || {};
  }

  setup (app) {
    this.app = app;
  }

  // GET http://localhost:8080/links/
  async find (_params) {
    const firebase = getFirebase();
    const db = firebase.firestore();
    const userUid = firebase.auth().currentUser.uid;

    return db.collection('links').get()
      .then(documents => {
        let data = [];

        documents.forEach(document => {
          if (document.id.includes(userUid))
            data.push(document.data());
        });

        return { success: true, data };
      })
      .catch(error => {
        return { success: false, error };
      });
  }

  // GET http://localhost:8080/links/{uuid}
  async get (uuid, _params) {
    const firebase = getFirebase();
    const db = firebase.firestore();
    const userUid = firebase.auth().currentUser.uid;

    return db.collection('links').doc(`${userUid}-${uuid}`).get().then((doc) => {
      return  { success: true, data: doc.data() };
    });
  }

  // POST http://localhost:8080/links/
  /*
    req:

    {
      "trigger_app": "Spotify",
      "react_app": "Youtube",
      "trigger_action": "whatever",
      "react_action": "whatever"
    }

    res:
      {
        "success": "true"
        "uuid": "uuid"
        "data": {
          "user": "uid",
          "trigger_app": "Spotify",
          "react_app": "Youtube",
          "trigger_action": "whatever",
          "react_action": "whatever"
        }
      }
  */
  async create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }
    const firebase = getFirebase();
    const db = firebase.firestore();
    const userUid = firebase.auth().currentUser.uid;
    const uuid = uuidv4();

    const snapshots = this.app.service('snapshots');
    const snapshot = await snapshots.create({
      snapshot: {},
      ...data
    });

    return db.collection('links').doc(`${userUid}-${uuid}`).set({
      user: userUid,
      snapshot_uid: snapshot.data.uid,
      uuid,
      ...data
    }).then(() => {
      return  { success: true, uuid, data: {user: userUid, ...data} };
    });
  }

  // PUT http://localhost:8080/links/{uuid}
  /*
    req:

    {
      "trigger_app": "Spotify", or
      "react_app": "Youtube", or
      "trigger_action": "whatever", or
      "react_action": "whatever" or
    }

    res:
      {
        "success": "true"
        "uuid": "uuid"
        "data": {
          "user": "uid",
          "trigger_app": "Spotify",
          "react_app": "Youtube",
          "trigger_action": "whatever",
          "react_action": "whatever"
        }
      }
  */
  async update (uuid, data, _params) {
    const firebase = getFirebase();
    const db = firebase.firestore();
    const userUid = firebase.auth().currentUser.uid;

    return db.collection('links').doc(`${userUid}-${uuid}`).update({
      ...data
    }).then(() => {
      return  { success: true, uuid, data: {user: userUid, ...data} };
    });
  }

  // not available
  async patch (_id, _data, _params) {
    throw new Error('Request deprecated');
  }

  // DELETE http://localhost:8080/links/{uuid}
  async remove (uuid, _params) {
    const firebase = getFirebase();
    const db = firebase.firestore();
    const userUid = firebase.auth().currentUser.uid;
    const doc = db.collection('links').doc(`${userUid}-${uuid}`);

    const document = await doc.get();
    const snapshots = this.app.service('snapshots');
    await snapshots.remove(document.data().snapshot_uid);

    return doc.delete().then(() => {
      return { success: true };
    });
  }
};
