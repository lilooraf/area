const users = require('./users/users.service.js');
const servicesAvailable = require('./services-available/services-available.service.js');
const userCollection = require('./user-collection/user-collection.service.js');
const linkCollection = require('./link-collection/link-collection.service.js');
const snapshots = require('./snapshots/snapshots.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(servicesAvailable);
  app.configure(userCollection);
  app.configure(linkCollection);
  app.configure(snapshots);
};
