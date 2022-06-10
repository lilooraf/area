

const userCreate = require('../../hooks/user.create');

const userUpdate = require('../../hooks/user.update');

const userAuth = require('../../hooks/user.auth');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [userAuth()],
    create: [userCreate()],
    update: [userUpdate()],
    patch: [],
    remove: [userAuth()]
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
