/*const axios = require('axios')
import { Client, Command } from "../classes";
import { Message } from "discord.js"

export default class Bot_avatar extends Command {
    constructor(client: Client) {
        super({
            name: "bot-avatar",
            description: "Changes the bot's avatar!"
        });
        this.client = client;
    }

    async run(msg: Message, args: string[]) {
        if (!args[0]) return msg.channel.send("Please send me a valid link to change my avatar!");
        try {
            const res = await axios.get(args[0], { responseType: 'arraybuffer' })
            this.client.user.setAvatar(res.data);
            msg.channel.send("Succesfully changed my avatar!");
        } catch {
            msg.channel.send("Something weird happened and I could not change my avatar!");
        }
    }
}*/
