

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Guild } = require("discord.js");
const classes_1 = require("../classes");
class Bot_name extends classes_1.Command {
    constructor(client) {
        super({
            name: "setup-role",
            description: "Role Setup Command",
            aliases: ["sr", "devrole"]
        });
        this.client = client;
    }
     async run(msg, args) {
        let client = this.client


        if (
            !msg.guild.me.permissions.has(
              "MANAGE_MESSAGES",
              "MENTION_EVERYONE",
              "SEND_MESSAGES",
              "READ_MESSAGE_HISTORY",
              "VIEW_CHANNEL"
            )
          )
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
      
          
          if (!msg.member.permissions.has("ADMINISTRATOR"))
            return msg.channel.send(`${msg.author.username} | :x: You need Admin Perms to execute this Command`);
      
          await msg.delete();

       const role =  msg.guild.roles.create({
            data: {
                name: "Dev Role",
                color: "BLUE"
            }
        })

          let embed = msg.channel.send({
            embed: {
                color: client.brandingColor,
                title: "Role Created",
                description: `
                <:tada:864923021697351680> Successfully create the Role!
                `,
                footer: {
                    text: "🌐 Powered by Fairfight"
                
                },
                thumbnail: {
                    url: this.client.user.avatarURL({
                        format: "png",
                        size: 1024
                    })
                }
            },
            
        })
    }
}
exports.default = Bot_name;
