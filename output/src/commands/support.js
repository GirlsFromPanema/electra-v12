"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../classes");
class Bot_name extends classes_1.Command {
    constructor(client) {
        super({
            name: "support",
            description: "Support Server Command"
        });
        this.client = client;
    }
    run(msg, args) {
        let client = this.client
        let embed = msg.channel.send({
            embed: {
                color: client.brandingColor,
                title: "Support Server",
                description: `
                Found any errors or need help? 
                <:Arrow:855707077812551750> https://discord.gg/yszNJjN4Q9`,
                footer: {
                    text: "🌐 Powered by Fairfight"
                },
            }
        })
    }
}
exports.default = Bot_name;
