var expect = require('expect');

var {Users} = require('./users');

describe('Users', () => {

  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Ray',
      room: 'Node Course'
    }, {
      id: '2',
      name: 'Gee',
      room: 'React Course'
    }, {
      id: '3',
      name: 'Aite',
      room: 'Node Course'
    }];
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Ray',
      room: 'LOTR'
    };

    var resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    var resUser = users.removeUser(2);
    expect(resUser.name).toBe('Gee');
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user when id invalid', () => {
    var resUser = users.removeUser(5);
    expect(resUser).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    var resUser = users.getUser(3);
    expect(resUser).toEqual(users.users[2]);
  });

  it('shpuld not find user', () => {
    var resUser = users.getUser(5);
    expect(resUser).toNotExist();
  });

  it('should return names of users in Node Course', () => {
    var usersList = users.getUsersList('Node Course');

    expect(usersList).toEqual(['Ray', 'Aite']);
  });

  it('should return names of users in React course', () => {
    var usersList = users.getUsersList('React Course');

    expect(usersList).toEqual(['Gee']);
  });
})