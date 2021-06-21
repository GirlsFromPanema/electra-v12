/*"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios = require('axios');
const classes_1 = require("../classes");
class Bot_avatar extends classes_1.Command {
    constructor(client) {
        super({
            name: "bot-avatar",
            description: "Changes the bot's avatar!"
        });
        this.client = client;
    }
    async run(msg, args) {
        if (!args[0])
            return msg.channel.send("Please send me a valid link to change my avatar!");
        try {
            const res = await axios.get(args[0], { responseType: 'arraybuffer' });
            this.client.user.setAvatar(res.data);
            msg.channel.send("Succesfully changed my avatar!");
        }
        catch {
            msg.channel.send("Something weird happened and I could not change my avatar!");
        }
    }
}
exports.default = Bot_avatar;
*/