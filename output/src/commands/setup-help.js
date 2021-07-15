"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../classes");
class Bot_name extends classes_1.Command {
    constructor(client) {
        super({
            name: "setup-help",
            description: "Setup command",
            aliases: ["sh", "setuphelp"]
        });
        this.client = client;
    }
    run(msg, args) {
        let client = this.client
        let embed = msg.channel.send({
            embed: {
                color: client.brandingColor,
                title: "Setup Help",
                description: `
                <:Arrow:855707077812551750> Step 1: Run *setup. 
                She will ask for the Channel where Electra should send the messages to.
                <:Arrow:855707077812551750> Step 2: Provide the Role he should Ping + Bots he should track.

                <:warning:855706704099672075> The Setup is timed, if u don't answer in under a minute, the command gets terminated
                <:warning:855706704099672075> Note: Please only add Bots you have made.
                `,
                footer: {
                    text: "Electra | Made with ❤️"
                },
                thumbnail: {
                    url: this.client.user.avatarURL({
                        format: "png",
                        size: 1024
                    })
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

