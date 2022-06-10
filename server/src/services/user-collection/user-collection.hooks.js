const userAuth = require('../../hooks/user.auth');

const userCollectionCreate = require('../../hooks/user-collection.create');

const userCollectionUpdate = require('../../hooks/user-collection.update');

const userCollectionGet = require('../../hooks/user-collection.get');

module.exports = {
  before: {
    all: [ userAuth() ],
    find: [],
    get: [userCollectionGet()],
    create: [userCollectionCreate()],
    update: [userCollectionUpdate()],
    patch: [],
    remove: [userCollectionGet()]
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
