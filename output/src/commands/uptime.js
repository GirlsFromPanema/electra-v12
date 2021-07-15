const ms = require("ms")
const os = require("os")

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../classes");
class Bot_name extends classes_1.Command {
    constructor(client) {
        super({
            name: "uptime",
            description: "Uptime of bot command"
        });
        this.client = client;
    }
    async run(msg, args) {
        let client = this.client

        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        let uptime = `**${days}** days, **${hours}** hours, **${minutes}** minutes, **${seconds}** seconds`


        
        let embed = msg.channel.send({
            embed: {
                color: client.brandingColor,
                title: "Uptime",
                description: `**${days}** days, **${hours}** hours, **${minutes}** minutes, **${seconds}** seconds`,
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
