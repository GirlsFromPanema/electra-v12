const Discord = require("discord.js")

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../classes");
class Bot_name extends classes_1.Command {
    constructor(client) {
        super({
            name: "servers",
            description: "[Owner Only] Check servers from Electra"
        });
        this.client = client;
    }
    run(msg, args) {
        let client = this.client

        if (msg.author.id !== '578678204890349594') {
            return msg.channel.send(":x: | You don't have Permissions");
            }
	
            let clientGuilds = msg.client.guilds.cache;
            let messageObj = Discord.Util.splitMessage(
                clientGuilds.map(g => '\`' + g.id + `\` **|** \`` + g.name + `\` **|** \`` + g.members.cache.size + '\`') || 'None'
            );
            if (messageObj.length == 1) {
                msg.channel.send(messageObj[0]);
            } else {
                for (i = 0; messageObj.length < i; i++) {
                    msg.channel.send(messageObj[i]);
                }
            }
    }
}
exports.default = Bot_name;
