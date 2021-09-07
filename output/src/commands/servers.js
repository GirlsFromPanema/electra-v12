"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../classes");
const ReactionMenu = require("../Data/ReactionMenu")
const MessageEmbed = require("discord.js")

class Bot_name extends classes_1.Command {
  constructor(client) {
    super({
      name: "servers",
      description: "List Server Command (Owner only)",
      aliases: ["s"],
    });
    this.client = client;
  }
  run(msg, args) {
    let client = this.client;

    if (msg.author.id !== "578678204890349594") {
      return msg.channel.send(":x: | You are not allowed to use this Command");
    }
    const servers = msg.client.guilds.cache.array().map((guild) => {
      return `\`${guild.id}\` - **${guild.name}** - \`${guild.memberCount}\` members`;
    });
    
    if (servers.length <= 10) {
      const range = servers.length == 1 ? "[1]" : `[1 - ${servers.length}]`;
      let embed = msg.channel.send({
        title: "Server List",
        color: "BLUE",
        description: servers.join("\n"),
        footer: {
          text: msg.author.displayAvatarURL({ dynamic: true }),
        }
      })
    } else {
      new ReactionMenu(
        msg.client,
        msg.channel,
        msg.member,
        MessageEmbed(),
        servers
      );
    }
    
  }
}
exports.default = Bot_name;
