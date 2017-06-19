var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should return correct message', () => {
    var from = 'Admin Ray';
    var message = 'Welcome here';
    var res = generateMessage(from, message);

    expect(res.from).toBe(from);
    expect(res.text).toBe(message);
    expect(res.createdAt).toBeA('number');
  });
});

