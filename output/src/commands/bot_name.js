/*"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../classes");
class Bot_name extends classes_1.Command {
    constructor(client) {
        super({
            name: "bot_name",
            description: "Changes the bot's name!"
        });
        this.client = client;
    }
    async run(msg, args) {
        if (!args[0])
            return msg.channel.send("Please send me a name to change my name!");
        try {
            this.client.user.setUsername(args.join(" "));
            msg.channel.send("Succesfully changed my name!");
        }
        catch {
            msg.channel.send("Something weird happened and I could not change my name!");
        }
    }
}
exports.default = Bot_name;
*/