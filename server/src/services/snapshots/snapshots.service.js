// Initializes the `snapshots` service on path `/snapshots`
const { Snapshots } = require('./snapshots.class');
const hooks = require('./snapshots.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/snapshots', new Snapshots(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('snapshots');

  service.hooks(hooks);
};
