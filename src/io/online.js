
// online users store

class OnlineUsers {
    static users = {};

    static getAll() {
        return this.users
    }

    static append(userId, userObj) {
        this.users[userId] = userObj;
    }

    static remove(userId) {
        delete this.users[userId];
    }

    static getOne(userId) {
        return this.users[userId]
    }
}

module.exports = {
    OnlineUsers
}
