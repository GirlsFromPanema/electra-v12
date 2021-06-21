import { Presence } from "discord.js";
import { Client } from "../classes";

export default {
    name: "presenceUpdate",
    execute(oldPresence: Presence, newPresence: Presence, client: Client) {
        if (!oldPresence || !oldPresence.user.bot) return;
        let oldSt: string = oldPresence.status
        let newSt: string = newPresence.status
        if (oldSt == newSt) return;
        let config: { channel: string, role: string, bots: string[] } = client.db.get(oldPresence.member.guild.id)
        if (!config || !config.channel || !config.role || !config.bots) return;
        if (!config.bots.includes(oldPresence.userID)) return;
        if (oldSt == "offline") { //if a bot became online
            //@ts-ignore
            oldPresence.member.guild.channels.cache.get(config.channel).send(`<@&${config.role}>`, { embed: { title: "Bot went online!", description: `Looks like ${oldPresence.member} (${oldPresence.user.tag}) just went back online! `, thumbnail: { url: oldPresence.user.avatarURL({ format: "png", size: 1024 }) }, timestamp: new Date(Date.now()) } })
        } else if (newSt == "offline") { //if a bot became offline
            //@ts-ignore
            oldPresence.member.guild.channels.cache.get(config.channel).send(`<@&${config.role}>`, { embed: { title: "Bot went offline!", description: `${oldPresence.member} (${oldPresence.user.tag}) just went offline!`, thumbnail: { url: oldPresence.user.avatarURL({ format: "png", size: 1024 }) }, timestamp: new Date(Date.now()) } })
        } else return;
    }
}