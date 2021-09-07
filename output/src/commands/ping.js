"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../classes");
class Bot_name extends classes_1.Command {
    constructor(client) {
        super({
            name: "ping",
            description: "Ping/Latency Command",
            aliases: ["p"]
        });
        this.client = client;
    }
    run(msg, args) {
        let client = this.client
        msg.react("😺")
        let embed = msg.channel.send({
            embed: {
                color: client.brandingColor,
                title: "Ping",
                description: `
                Gateway Ping: <:network:855826859085004820> ${this.client.ws.ping}
                Websocket Ping: <:config:855828811630641163> ${this.client.ws.ping}
                Serving Coffee to: ${client.guilds.cache.map(s => s.memberCount).reduce((a, b) => a + b)} Users
                Watching over: ${client.guilds.cache.size} Servers
                `,
                
               
                footer: {
                    text: "🌐 Powered by Fairfight"
                },
                thumbnail: {
                    url: this.client.user.avatarURL({
                        format: "png",
                        size: 1024
                    })
                }
            }
        })
      
    }
}
exports.default = Bot_name;
