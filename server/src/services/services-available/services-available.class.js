const { getFirebase } = require('../../shared/firebase');

exports.ServicesAvailable = class ServicesAvailable {
  constructor (options) {
    this.options = options || {};
  }

  // GET http://localhost:8080/services-available/
  async find (_params) {
    const firebase = getFirebase();
    const db = firebase.firestore();
    return db.collection('services').get().then((snapshots) => { 
      var data = []; 
      snapshots.docs.forEach((doc) => {
        data.push(doc.data());
      });
      return  { success: true, body: data };
    });
  }

  // GET http://localhost:8080/services-available/{document}
  async get (document) {
    const firebase = getFirebase();
    const db = firebase.firestore();
    return db.collection('services').doc(document).get().then((doc) => {
      return { success: true, body: {...doc.data()} };
    });
  }

  // POST http://localhost:8080/services-available/
  /*
    rep:
      {
        "name": "Spotify",
        "body": {
          "name": "Spotify"
          "create_playlist": "something",
          "add_item_to_playlist": "something"
        }
      }
  */
  async create (data, _params) {
    const firebase = getFirebase();
    const db = firebase.firestore();
    return db.collection('services').doc(data.name).set({...data.body}).then(() => {return { success: true };});
  }

  // PUT http://localhost:8080/services-available/{service}
  /*
    data:
      {
        "name": "Spotify"
        "create_playlist": "something",
        "add_item_to_playlist": "something"
      }
  */
  async update (service, data, _params) {
    const firebase = getFirebase();
    const db = firebase.firestore();
    return db.collection('services').doc(service).update({...data}).then(() => { return { success: true };});
  }

  // not available
  async patch (_id, _data, _params) {
    throw new Error('Request deprecated');
  }

  // DELETE http://localhost:8080/services-available/{document}
  async remove (document, _params) {
    const firebase = getFirebase();
    const db = firebase.firestore();
    const doc = db.collection('services').doc(document);

    return doc.delete().then(() => {
      return { success: true };
    });
  }
};
