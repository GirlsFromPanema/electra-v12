import { Client, Command } from "../classes";
import { Message } from "discord.js"

export default class Help extends Command {
    constructor(client: Client) {
        super({
            name: "help",
            description: "Sends the help menu of [bot name]!",
            aliases: ["h"]
        });
        this.client = client;
    }

    async run(msg: Message, args: string[]) {
        if (!args[0]) {
            let commands = this.client.commands
            let help = {
                color: this.client.brandingColor,
                fields: [],
                title: "Help",
                description: `Hey I'm ${this.client.user.tag}! Here are all my commands:`,
                footer: {
                    text: "If you want to get more infos on a command, please do `help COMMAND_NAME`!"
                },
                thumbnail: {
                    url: this.client.user.avatarURL({
                        format: "png",
                        size: 1024
                    })
                }
            }
            commands.forEach(c => {
                help.fields.push({
                    name: c.name,
                    value: c.description,
                    inline: true
                })
            })
            msg.channel.send({ embed: help })
        } else if (this.client.getCommand(args[0])) {
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
        } else {
            return msg.channel.send("Command not found :(")
        }
    }
};