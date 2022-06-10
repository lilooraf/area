const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

// auth trigger  (new user signup)
exports.newUserCreated = functions.auth.user().onCreate((user) => {
  console.log(`create user-${user.uid}`);
  return admin.firestore().collection("users").doc(`user-${user.uid}`).set({}).
      then((res) => {
        console.log(`create resultat ${res}`);
      });
});

// auth trigger (user deleted)
exports.userDeleted = functions.auth.user().onDelete((user) => {
  console.log(`delete user-${user.uid}`);
  const doc = admin.firestore().collection("users").doc(`user-${user.uid}`);

  return doc.delete().then((res) => {
    console.log(`delete resultat ${res}`);
  });
});
