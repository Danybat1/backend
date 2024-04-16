"use strict";

let { OnlineUsers } = require("./io/online");
const { IOServer } = require("./io/server");

module.exports = {
  register(/*{ strapi }*/) {},

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

      _user.socket = socket?.id;

      console.log("a new user has just been connected", _user);

      OnlineUsers.append(_user?.userId, _user);
    });

    if (process.env.NODE_ENV === "production") {
      console.log = () => {};
      console.error = () => {};
      console.info = () => {};
    }
  },
};
