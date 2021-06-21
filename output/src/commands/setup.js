"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../classes");
class Setup extends classes_1.Command {
  constructor(client) {
    super({
      name: "setup",
      description: "The setup command!",
    });
    this.client = client;
  }
  async run(msg, args) {
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
      return msg.channel.send(`You need Admin Perms to execute this Command`);

    await msg.delete();

    let client = this.client;
    let embed = await msg.channel.send({
      embed: {
        color: client.brandingColor,
        title: "Setup",
        description:
          "Welcome to my setup! I will be looking at the presence of some bots in your server and tell you when they get offline/online!\n Please mention the channel where you would like to send Updates!",
        footer: {
          text: "🌐 Powered by Fairfight - TempSetup [60 Sec]",
        },
      },
    });
    let obj = {
      channel: "",
      role: "",
      bots: [""],
    };
    function one() {
      let collector1 = msg.channel.createMessageCollector(
        (m) => m.author.id === msg.author.id,
        { time: 60000 }
      );
      collector1.on("collect", (m) => {
        const channel = client.parseChannelMention(m.content.trim(), msg.guild);
        if (!channel) {
          msg.channel.send(`This is not an valid Channel!`);
          embed.delete();
        } else {
          obj.channel = channel.id;
          two();
        }
        collector1.stop();
        m.delete();
      });
      collector1.on("end", (collected) => {
        if (collected.size == 0) {
          msg.channel.send(
            "No channels received in 60 seconds, setup canceled\n\n To rerun, type `*setup`again!"
          );
          embed.delete();
        }
      });
    }
    async function two() {
      await embed.edit({
        embed: {
          color: client.brandingColor,
          title: "Setup Role",
          description:
            "Alright! Now i would need the role to ping whenever I see that a bot went on/offline. Please mention it in the next 60 seconds",
          footer: {
            text: "🌐 Powered by Fairfight",
          },
        },
      });
      let collector2 = msg.channel.createMessageCollector(
        (m) => m.author.id === msg.author.id,
        { time: 60000 }
      );
      collector2.on("collect", (m) => {
        const role = client.parseRoleMention(m.content.trim(), msg.guild);
        if (!role) {
          msg.channel.send(`This is not an valid Role!`);
          embed.delete();
        } else {
          obj.role = role.id;
          three();
        }
        m.delete();
        collector2.stop();
      });
      collector2.on("end", (collected) => {
        if (collected.size == 0) {
          msg.channel.send("No roles received in 60 seconds :(");
          embed.delete();
        }
      });
    }
    async function three() {
      await embed.edit({
        embed: {
          color: client.brandingColor,
          title: "Setup Bots",
          description:
            "Please mention all Bots (`@Bot1,@Bot2`) you would like to scan for they presence!",
          footer: {
            text: "🌐 Powered by Fairfight",
          },
        },
      });
      let collector3 = msg.channel.createMessageCollector(
        (m) => m.author.id === msg.author.id,
        { time: 60000 }
      );
      collector3.on("collect", (m) => {
        const bots = m.mentions.members.filter((value) => value.user.bot);
        if (!bots.first()) {
          msg.channel.send(
            `${message.author.username} Those bots are not on the Server!`
          );
          embed.delete();
        } else {
          obj.bots = bots.map((value, key) => key);
          finish();
        }
        m.delete();
        collector3.stop();
      });
      collector3.on("end", (collected) => {
        if (collected.size == 0) {
          msg.channel.send("No bots received in 60 seconds :(");
          embed.delete();
        }
      });
    }
    one();
    function finish() {
      client.db.set(msg.guild.id, obj);
      msg.channel.send(`✅ Setup completed!`);
      embed.delete();
    }
  }
}
exports.default = Setup;
