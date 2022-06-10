const assert = require('assert');
const app = require('../../src/app');

describe('\'snapshots\' service', () => {
  it('registered the service', () => {
    const service = app.service('snapshots');

    assert.ok(service, 'Registered the service');
  });
});
