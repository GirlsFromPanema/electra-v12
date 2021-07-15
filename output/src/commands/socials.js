

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../classes");
class Bot_name extends classes_1.Command {
    constructor(client) {
        super({
            name: "socials",
            description: "Electras Socials"
        });
        this.client = client;
    }
    run(msg, args) {
        let client = this.client
        let embed = msg.channel.send({
            embed: {
                color: client.brandingColor,
                title: "Website + Bot Invite",
                description: `
                <:users:855826713018630175> [Website](https://fairfight.netlify.app/)
                <:config:855828811630641163> [Bot Invite](https://bit.ly/3wGUs1r)
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
            },
            
        })
        
    }
}
exports.default = Bot_name;
