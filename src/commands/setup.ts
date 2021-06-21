import { Client, Command } from "../classes";
import { Message } from "discord.js"

export default class Setup extends Command {
    constructor(client: Client) {
        super({
            name: "setup",
            description: "The setup command!",
        });
        this.client = client;
    }

    async run(msg: Message, args: string[]) {
        await msg.delete()
        let client = this.client
        let embed = await msg.channel.send({
            embed: {
                color: client.brandingColor,
                title: "Setup",
                description: "Welcome to my setup! I will be looking at the presence of some bots in your server and tell you when they get offline/online! To start, please give me a channel for me to send my messages in the next 60 seconds:"
            }
        })
        let obj = {
            channel: "",
            role: "",
            bots: [""]
        }
        function one() {
            let collector1 = msg.channel.createMessageCollector((m) => m.author.id === msg.author.id, { time: 60000 })
            collector1.on("collect", ((m: Message) => {
                const channel = client.parseChannelMention(m.content.trim(), msg.guild)
                if (!channel) {
                    msg.channel.send("This is not a channel!")
                    embed.delete()
                } else {
                    obj.channel = channel.id
                    two()
                }
                collector1.stop()
                m.delete()
            }))
            collector1.on("end", (collected) => {
                if (collected.size == 0) {
                    msg.channel.send("No channels received in 60 seconds, setup canceled.")
                    embed.delete()
                }
            })
        }
        async function two() {
            await embed.edit({
                embed: {
                    color: client.brandingColor,
                    title: "Setup Role",
                    description: "Alright! Now i would need the role to ping whenever I see that a bot changed his presence. Please mention it in the next 60 seconds"
                }
            })
            let collector2 = msg.channel.createMessageCollector((m) => m.author.id === msg.author.id, { time: 60000 })
            collector2.on("collect", (m: Message) => {
                const role = client.parseRoleMention(m.content.trim(), msg.guild)
                if (!role) {
                    msg.channel.send("This is not a role!")
                    embed.delete()
                } else {
                    obj.role = role.id
                    three()
                }
                m.delete()
                collector2.stop()
            })
            collector2.on("end", (collected) => {
                if (collected.size == 0) {
                    msg.channel.send("No roles received in 60 seconds :(")
                    embed.delete()
                }
            })
        }
        async function three() {
            await embed.edit({
                embed: {
                    color: client.brandingColor,
                    title: "Setup Bots",
                    description: "Everything went clean so far! To finish this setup, I would need you to mention all the bots you want me to check their presence!"
                }
            })
            let collector3 = msg.channel.createMessageCollector((m) => m.author.id === msg.author.id, { time: 60000 })
            collector3.on("collect", (m: Message) => {
                const bots = m.mentions.members.filter(value => value.user.bot)
                if (!bots.first()) {
                    msg.channel.send("Couldn't find a single bot in the users you mentioned :(!")
                    embed.delete()
                } else {
                    obj.bots = bots.map((value, key) => key)
                    finish()
                }
                m.delete()
                collector3.stop()
            })
            collector3.on("end", (collected) => {
                if (collected.size == 0) {
                    msg.channel.send("No bots received in 60 seconds :(")
                    embed.delete()
                }
            })
        }
        one()
        function finish() {
            client.db.set(msg.guild.id, obj)
            msg.channel.send("Setup completed!")
            embed.delete()
        }
    }
}