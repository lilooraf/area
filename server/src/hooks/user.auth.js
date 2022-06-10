// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const firebase = require('firebase/app');
require('firebase/auth');

// eslint-disable-next-line no-unused-vars
module.exports = (_options = {}) => {
  return async context => {
    if (!firebase.auth().currentUser)
      throw new Error('you must be authenticated');
    return context;
  };
};
