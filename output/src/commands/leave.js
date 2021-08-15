"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../classes");
class Bot_name extends classes_1.Command {
  constructor(client) {
    super({
      name: "leave",
      description: "Leave Server Command (Owner only)",
      aliases: ["l"],
    });
    this.client = client;
  }
  async run(msg, args) {
    let client = this.client;

    const rgx = /^(?:<@!?)?(\d+)>?$/;

    if (msg.author.id !== "578678204890349594") {
      return msg.channel.send(":x: | You are not allowed to use this Command");
    }

    const guildId = args[0];
    if (!rgx.test(guildId)) return msg.channel.send(`Provide a guild`);
    const guild = msg.client.guilds.cache.get(guildId);
    if (!guild) return msg.channel.send(`Invalid guild ID`);
    await guild.leave()
    
      let embed = msg.channel.send({
        embed: {
          color: client.brandingColor,
          title: `Left Server`,
          description: `I have successfully left **${guild.name}**.`,

          footer: {
            text: "🌐 Powered by Fairfight",
          },
        },
      });
    
  }
}
exports.default = Bot_name;
