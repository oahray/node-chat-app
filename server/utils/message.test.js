var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', () => {
  it('should return correct message with co-ordinates', () => {
    var from = "Admin1";
    var latitude = 15;
    var longitude = 16;
    var url = "https://www.google.com/maps?q=15,16";
    var message = generateLocationMessage(from,latitude, longitude);

    expect(message).toInclude({from, url});
    expect(message.createdAt).toBeA('number');
  });
});