const { getFirebase } = require('../../shared/firebase');

/* eslint-disable no-unused-vars */
exports.Users = class Users {
  constructor (options, app) {
    this.options = options || {};
  }

  async find (_params) { return { success: false, error: 'Request deprecated' }; }

  // GET http://localhost:8080/users/{random id}
  async get (_id, _params) {
    const firebase = getFirebase();
    const { email } = firebase.auth().currentUser;
    return { success: true, email };
  }

  // POST http://localhost:8080/users/
  /*
    data:
      {
        "email": "exemple@gmail.com",
        "password": "********"
      }

  */
  async create (data, _params) {
    console.log(data);
    const firebase = getFirebase();
    return firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
      .then(({ user }) => { return { success: true, email: user.email /* TODO: displayName */}; })
      .catch(({ message: error }) => { return { success: false, error }; });
  }

  // PUT http://localhost:8080/users/{random id}
  /*
    if you want to signin data:
    {
      "signin": true,
      "email": "exemple@gmail.com",
      "passeword": "******"
    }

    if you want to signout data:
    {
      "signout": true
    }

    if you want to reset your password data:
    {
      "reset": true,
      "email": "exemple@gmail.com"
    }

  */
  async update (_id, data, _params) {
    const firebase = getFirebase();
    if (data.signin) {
      return firebase.auth().signInWithEmailAndPassword(data.email, data.password)
        .then(({ user }) => { return { success: true, email: user.email, user /* TODO: displayName */}; })
        .catch(({ message: error }) => { return { success: false, error }; });
    } else if (data.signout) {
      return firebase.auth().signOut()
        .then(() => { return {success: true }; })
        .catch(({ message: error }) => { return { success: false, error }; });
    } else if (data.reset) {
      return firebase.auth().sendPasswordResetEmail(data.email)
        .then(() => {return {success: true}; })
        .catch(({ message: error }) => { return { success: false, error }; });
    } else {
      // update comming soon
      return { success: false, info: 'work in progress'};
    }
  }

  async patch (_id, _data, _params) { return { success: false, error: 'Request deprecated' }; }

  // DELETE http://localhost:8080/users/{random id}
  async remove (_id, _params) {
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;

    return user.delete()
      .then(() => { return { success: true }; })
      .catch(({ message: error }) => { return { success: false, error }; });
  }
};
