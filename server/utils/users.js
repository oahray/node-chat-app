class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }

  removeUser(id) {
    var user = this.getUser(id);

    if (user) {
      var index = this.users.indexOf(user);
      this.users.splice(index, 1);
    }
    return user;
  }

  getUser(id) {
    return this.users.filter((user) => user.id === id.toString())[0];
  }

  getUsersList(room) {
    var users = this.users.filter((user) => {
      return user.room === room;
    });

    var namesArray = users.map((user) => user.name);
    return namesArray;
  }
};

module.exports = {Users};