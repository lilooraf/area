const assert = require('assert');
const app = require('../../src/app');

describe('\'servicesAvailable\' service', () => {
  it('registered the service', () => {
    const service = app.service('services-available');

    assert.ok(service, 'Registered the service');
  });
});
