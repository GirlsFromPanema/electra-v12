"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../classes");
class Help extends classes_1.Command {
    constructor(client) {
        super({
            name: "help",
            description: "Sends the help menu of Electra",
            aliases: ["h", "hp"]
        });
        this.client = client;
    }
    async run(msg, args) {
        if (!args[0]) {
            let commands = this.client.commands;
            let help = {
                color: this.client.brandingColor,
                fields: [],
                title: "Help",
                description: `Hey there, I'm ${this.client.user.tag}! Here are all my commands:`,
                footer: {
                    text: "🌐 Powered by Fairfight"
                },
                thumbnail: {
                    url: this.client.user.avatarURL({
                        format: "png",
                        size: 1024
                    })
                }
            };
            commands.forEach(c => {
                help.fields.push({
                    name: c.name,
                    value: c.description,
                    inline: true
                });
            });
            msg.channel.send({ embed: help });
        }
        else if (this.client.getCommand(args[0])) {
            let command = this.client.getCommand(args[0]);
            msg.channel.send({
                embed: {
                    color: this.client.brandingColor,
                    title: `Help about the **${command.name}** command`,
                    fields: [
                        {
                            name: "Description",
                            value: command.description || "None"
                        },
                        {
                            name: "Aliases",
                            value: command.aliases.join("\n") || "None"
                        }
                    ],
                    thumbnail: {
                        url: this.client.user.avatarURL({
                            format: "png",
                            size: 1024
                        })
                    },
                }
            });
        }
        else {
            return msg.channel.send("I could not find this command! Maybe try another one?");
        }
    }
}
exports.default = Help;
;
