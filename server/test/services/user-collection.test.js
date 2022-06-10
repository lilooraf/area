const assert = require('assert');
const app = require('../../src/app');

describe('\'user-collection\' service', () => {
  it('registered the service', () => {
    const service = app.service('collection');

    assert.ok(service, 'Registered the service');
  });
});
