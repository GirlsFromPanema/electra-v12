"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "ready",
    once: true,
    execute(client) {
        console.log(`Logged in as ${client.user.tag}!`);
        client.user.setActivity(`client.guilds.cache.size Server | *help`, { type: 'WATCHING' })
    }
};
// Servers: client.guilds.cache.size
// Users: client.guilds.cache.map(s => s.memberCount).reduce((a, b) => a + b)