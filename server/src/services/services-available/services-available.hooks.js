const userAuth = require('../../hooks/user.auth');

const servicesAvailableCreate = require('../../hooks/services-available.create');

const servicesAvailableUpdate = require('../../hooks/services-available.update');

const servicesAvailableGet = require('../../hooks/services-available.get');

module.exports = {
  before: {
    all: [userAuth()],
    find: [],
    get: [servicesAvailableGet()],
    create: [servicesAvailableCreate()],
    update: [servicesAvailableUpdate()],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
