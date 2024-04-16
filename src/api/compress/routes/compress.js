"use strict";

// analytics controller definition

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/compress",
      handler: "compress.index",
    },
  ],
};
