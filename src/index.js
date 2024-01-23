'use strict';

let { OnlineUsers } = require("./io/online");
const { IOServer } = require("./io/server");

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) { },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {
    IOServer.io = IOServer.io(strapi.server.httpServer, {
      cors: {
        origin: process.env.IO_ORIGIN,
        methods: ["GET", "POST"],
      },
    });

    console.log("io server just started successfully");

    IOServer.io.on("connection", function (socket) {
      const _user = socket?.handshake?.auth?.user;

      _user.socket = socket?.id

      console.log("a new user has just been connected", _user);

      OnlineUsers.append(_user?.userId, _user)

    })
  },
};
