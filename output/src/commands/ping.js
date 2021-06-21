"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../classes");
class Bot_name extends classes_1.Command {
    constructor(client) {
        super({
            name: "ping",
            description: "ping command"
        });
        this.client = client;
    }
    run(msg, args) {
        let client = this.client
        let embed = msg.channel.send({
            embed: {
                color: client.brandingColor,
                title: "Ping",
                description: `
                Gateway Ping: <:network:855826859085004820> ${this.client.ws.ping}
                Websocket Ping: <:config:855828811630641163> ${this.client.ws.ping}`,
                footer: {
                    text: "🌐 Powered by Fairfight"
                },
            }
        })
    }
}
exports.default = Bot_name;
