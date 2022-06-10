// Initializes the `user-collection` service on path `/collection`
const { UserCollection } = require('./user-collection.class');
const hooks = require('./user-collection.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/collection', new UserCollection(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('collection');

  service.hooks(hooks);
};
