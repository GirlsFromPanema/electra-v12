"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Guild, message, MessageEmbed } = require("discord.js");
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
        "EMBED_LINKS",
        "SEND_MESSAGES",
        "READ_MESSAGE_HISTORY",
        "VIEW_CHANNEL"
      )
    )  // Sending Error if he Bot doesn't have right Perms
      return msg.channel.send(`
            ❌ I require some Permissions!
      
            **I need the following Permissions to work on your Server:**
            MANAGE_MESSAGES, 
            EMBED_LINKS, 
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
    
    await msg.delete()

    const processembed = new MessageEmbed()
      .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
      .setColor("BLURPLE")
      .setFooter("Waiting for your reaction! | Canceling in `60` Seconds")
      .setTitle(`⚠️ | Information`)
      .setDescription(
        "Click ✅ to proceed the Setup\n Click ❌ to cancel the Setup"
      );

    const msgg = await msg.channel.send(processembed);
    setTimeout(() => msg.delete(), 60000);
    //message.channel.send("Didn't received any reaction after 10 seconds!")

    /* Loading Embed removed
    let okembed = new MessageEmbed()
      .setDescription(
        "<:Loading:869268932018704414> started processing the Environment"
      )
      .setColor("BLURPLE")
      .setTimestamp()
      .setFooter(`Done by ${message.author.username}`);
    */

    // Cancel Setup Process if there is already an existing channel called "Developer"
    // @ts-ignore
    let enverror = new MessageEmbed()
      .setTitle(":x: | Error")
      .setDescription(
        `${msg.author.username}, seems like your Server already has an Developer Category or Channel set\n\nThe Setup got cancelled to prevent Spaming Server Channels, Categories and Roles\n\nIf you wish to proceed this Setup, delete the Channel or Category called **Developer** and re-run this Command`
      )
      .setColor("RED")
      //.setFooter("")
      .setImage(
        "https://cdn.discordapp.com/attachments/860222821217468436/871476386739675146/e5017b97fecb1abaaacd304d24882905.webp"
      )
      .setTimestamp();

    let done = new MessageEmbed()
      .setTitle("✅ | Success")
      .setDescription("Successfully created the Environment")
      .setColor("GREEN")
      .setTimestamp()
      .setFooter(`Done by ${msg.author.username}`);

    let devembed = new MessageEmbed()
      .setTitle("Developer Information")
      .setDescription(
        `I have now created a special Category, Channel and Role where you can use me.\n
    Remember to change custom User Permissions if needed.\n
    **Thanks for using me!❤️**`
      )
      .setImage(
        "https://cdn.discordapp.com/attachments/860222821217468436/871476386739675146/e5017b97fecb1abaaacd304d24882905.webp"
      )
      .setColor("PINK");
    //.setFooter(`Ordered by: ${message.author.username}`)
    //.setTimestamp()

    await msgg.react("✅");
    await msgg.react("❌");

    const collector = msgg.createReactionCollector(
       
      (reaction, user) => user.id === msg.author.id
    );
    collector.on("collect", async (reaction) => {
      /*
      Deleting the message and cancel the Command when the Author reacts on ❌
      */
      if (reaction.emoji.name === "❌") {
        return msgg.delete();
      }

      if (reaction.emoji.name === "✅") {
        msgg.delete();


        /*
        @param Checking if any Channel already inclused or has the Name "Developer"
        @param If so, we are canceling the Setup and sending an Error Embed
        @param Very good against Spam, Raids etc - a good security option
        */
        const ch = msg.guild.channels.cache.find(
          (ch) => ch.name === "developer"
        );
        if (ch) return msg.channel.send(`${msg.author} your Server already has an Channel Environment called Developer\nIf you want to proceed, delete your current Channel and re-run!`);
        // End of security check

        // If everything is fine, the setup finishes and send this Message into the Channel the Setup got activated
        // @ts-ignore
        const successmessage = await msg.channel.send(done);
        //setTimeout(() => msg.delete(), 10000);

        // @ts-ignore
        const createrole = await msg.guild.roles.create({
          data: {
            name: "Developers",
            color: "BLUE",
            /*permissionOverwrites: [
              {
                id: message.guild.roles.everyone,
                deny: ["SEND_MESSAGES", "VIEW_CHANNEL"],
              },
            ],
            */
          },
        });

        const category = await msg.guild.channels.create("Developers", {
          type: "category",
          permissionOverwrites: [
            {
              id: msg.guild.roles.everyone || msg.guild.id,
              deny: ["SEND_MESSAGES", "VIEW_CHANNEL"],
            },
          ],
        });
        // @ts-ignore
        const channel = await msg.guild.channels
          .create("developer", {
            type: "text",
            parent: category,
            permissionOverwrites: [
              {
                id: msg.guild.roles.everyone || msg.guild.id,
                deny: ["SEND_MESSAGES", "VIEW_CHANNEL"],
              },
            ],
          })
          .then((channel) => channel.send(devembed));
      }

      await reaction.users.remove(msg.author.id);
    });
  }
}
exports.default = Bot_name;
