import { Client, Command } from "../classes";
import { Message } from "discord.js"

export default class Bot_name extends Command {
    constructor(client: Client) {
        super({
            name: "ping",
            description: "ping command"
        });
        this.client = client;
    }

     run(msg: Message, args: string[]) {
       
        let client = this.client
        let embed = msg.channel.send({
            embed: {
                color: client.brandingColor,
                title: "Ping",
                description: `${this.client.ws.ping} MS!`
            }
        })
    }
}