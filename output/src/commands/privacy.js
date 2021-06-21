"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../classes");
class Bot_name extends classes_1.Command {
    constructor(client) {
        super({
            name: "privacy",
            description: "Privacy Policy of the Bot",
            aliases: ["pp", "privacy-policy"]
        });
        this.client = client;
    }
    run(msg, args) {
        let client = this.client
        let embed = msg.channel.send({
            embed: {
                color: client.brandingColor,
                title: "Privacy Policy",
                description:
                `
                **What data do we store and why do we need it?**
                We only store Bot IDs from selfmade Bots on Discord. It's necessary because Electra
                is checking for the Bots presence 24/7.

                **Where do we store the data and who has access to it?**
                We use SQL to store Bot IDs, only Koni#9521 has access to the Panel (as an Owner of the Bot)

                **Can I delete my data? What should I do if I have any concerns.**
                Of course, kick the bot from the server and all the stored data from your server will be removed.

                **Contact informations**
                Discord : Koni#9521 / email : blacktipemodding@gmail.com
            
                `,
                footer: {
                    text: "🌐 Powered by Fairfight"
                },
            }
        })
    }
}
exports.default = Bot_name;
