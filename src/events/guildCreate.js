const client = require('../index.js')

/* Emitted whenever the client joins a guild.
PARAMETER    TYPE         DESCRIPTION
guild        Guild        The created guild    */
client.on("guildCreate", (guild) => {
    console.log(`the client joins a guild`);
});