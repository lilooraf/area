// Initializes the `link-collection` service on path `/link`
const { LinkCollection } = require('./link-collection.class');
const hooks = require('./link-collection.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/links', new LinkCollection(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('links');

  service.hooks(hooks);
};
