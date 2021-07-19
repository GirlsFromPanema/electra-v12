"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Guild, Message, MessageEmbed } = require("discord.js");
const classes_1 = require("../classes");
class Bot_name extends classes_1.Command {
  constructor(client) {
    super({
      name: "setup-env",
      description:
        "Sets up Role, Category and Channel Environment for the Developers",
      aliases: ["senv", "snv"],
    });
    this.client = client;
  }
  async run(msg, args) {
    let client = this.client;

    // Checking if Bot has Permissions
    if (
      !msg.guild.me.permissions.has(
        "MANAGE_MESSAGES",
        "MENTION_EVERYONE",
        "SEND_MESSAGES",
        "READ_MESSAGE_HISTORY",
        "VIEW_CHANNEL"
      )
    )  // Sending Error if he Bot doesn't have right Perms
      return msg.channel.send(`
            ❌ I require some Permissions!
      
            **I need the following Permissions to work on your Server:**
            MANAGE_MESSAGES, 
            MENTION_EVERYONE, 
            SEND_MESSAGES, 
            READ_MESSAGE_HISTORY,
            VIEW_CHANNEL
      
            <:config:855828811630641163> Please add me the right Permissions and re-run this Command!
        
            `);

    // Checking if User has Permissions
    if (!msg.member.permissions.has("ADMINISTRATOR"))
      return msg.channel.send(
        `${msg.author.username} | :x: You need Admin Perms to execute this Command`
      );
    await msg.delete();


    // Creating Role for Developers
    const role = await msg.guild.roles.create({
      data: {
        name: "Developers",
        color: "BLUE",
      },
    });

    // Developer Information Embed for the freshly created Channel
    const embednewchannel = new MessageEmbed()
    .setTitle("Developer Information") 
    .setDescription(`I have now created an special Category, Channel and Role where you can use me.\n
    Remember to change custom User Permissions if needed.\n
    **Thanks for using me!❤️**`)
    .setThumbnail("https://cdn.discordapp.com/attachments/863402250117185570/866806907570094080/459061ad92090eda37deacdebd0dfca3.png")
    .setColor("RANDOM")
    .setFooter("Electra | Helping Developers")
    .setTimestamp()


    // Creating Channels and Category for Developers
    const channel = await msg.guild.channels
      .create("Developers", {
        type: "category",
        permissionOverwrites: [
          {
            id: msg.guild.id,
            deny: ["VIEW_CHANNEL"],
          },
        ],
      })
      .then((cat) => {
        msg.guild.channels
          .create("developers", {
            type: "text",
            parent: cat,
            permissionOverwrites: [
              {
                id: msg.guild.id,
                deny: ["VIEW_CHANNEL"],
              },
            ],
          })
          .then((channel) => channel.send(embednewchannel));
      });
    
    // When successfully created Environment, embed into the authors channel
    let embed = msg.channel.send({
      embed: {
        color: client.brandingColor,
        title: "Environment Created",
        description: `
                <:tada:864923021697351680> Successfully created the Developers Role, Category and Channel!
                `,
        footer: {
          text: "🌐 Powered by Fairfight",
        },
        thumbnail: {
          url: this.client.user.avatarURL({
            format: "png",
            size: 1024,
          }),
        },
      },
    });
  }
}
exports.default = Bot_name;
