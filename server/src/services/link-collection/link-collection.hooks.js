const userAuth = require('../../hooks/user.auth');

const linkCollectionCreate = require('../../hooks/link-collection.create');

const linkCollectionGet = require('../../hooks/link-collection.get');

module.exports = {
  before: {
    all: [ userAuth() ],
    find: [],
    get: [ linkCollectionGet() ],
    create: [linkCollectionCreate()],
    update: [],
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
