/*import { Client, Command } from "../classes";
import { Message } from "discord.js"

export default class Bot_name extends Command {
    constructor(client: Client) {
        super({
            name: "bot-name",
            description: "Changes the bot's name!"
        });
        this.client = client;
    }

    async run(msg: Message, args: string[]) {
        if (!args[0]) return msg.channel.send("Please send me a name to change my name!");
        try {
            this.client.user.setUsername(args.join(" "));
            msg.channel.send("Succesfully changed my name!");
        } catch {
            msg.channel.send("Something weird happened and I could not change my name!");
        }
    }
}*/