import { Message } from "discord.js"
import { Client } from "../classes";
import colors from "colors";
import prefix from "../utils/prefix"

export default {
    name: "message",
    once: false,
    execute(msg: Message, client: Client) {
        if (msg.author.bot || msg.webhookID || msg.channel.type === "dm") return;
        let p = prefix(msg, client)
        if (!p) return;
        const cont = msg.content.slice(p.length).trim().split(" ");
        const c = client.getCommand(cont[0])
        if (!c) return;
        if (c.owner) {
            if (!client.isOwner(msg.author.id)) return;
        }
        let args = cont.slice(1);
        try {
            //@ts-ignore
            c.run(msg, args);
            console.log(colors.green(`[${new Date().toISOString()}][EVENT][MESSAGE] Command executed: ${c.name}`))
        } catch (e) {
            console.log(colors.red(`[${new Date().toISOString()}][EVENT][MESSAGE] Command failed: ${c.name}`))
            console.log(e)
        }
    }
}