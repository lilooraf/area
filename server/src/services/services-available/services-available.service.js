// Initializes the `servicesAvailable` service on path `/services-available`
const { ServicesAvailable } = require('./services-available.class');
const hooks = require('./services-available.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/services-available', new ServicesAvailable(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('services-available');

  service.hooks(hooks);
};
