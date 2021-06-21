"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = {
  name: "ready",
  once: true,
  execute: function execute(client) {
    console.log("Logged in as ".concat(client.user.tag, "!"));
    client.user.setActivity("RERUN SETUP! | *help", {
      type: 'WATCHING'
    });
  }
}; // Servers: client.guilds.cache.size
// Users: client.guilds.cache.map(s => s.memberCount).reduce((a, b) => a + b)