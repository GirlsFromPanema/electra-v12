"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "presenceUpdate",
    execute(oldPresence, newPresence, client) {
        if (!oldPresence || !oldPresence.user.bot)
            return;
        let oldSt = oldPresence.status;
        let newSt = newPresence.status;
        if (oldSt == newSt)
            return;
        let config = client.db.get(oldPresence.member.guild.id);
        if (!config || !config.channel || !config.role || !config.bots)
            return;
        if (!config.bots.includes(oldPresence.userID))
            return;
        if (oldSt == "offline") { //if a bot became online
            //@ts-ignore
            oldPresence.member.guild.channels.cache.get(config.channel).send(`<@&${config.role}>`, { embed: { title: "Bot went online!", description: `Looks like ${oldPresence.member} (${oldPresence.user.tag}) just went back online! `, color: "GREEN", thumbnail: { url: oldPresence.user.avatarURL({ format: "png", size: 1024 }) }, timestamp: new Date(Date.now()) } });
        }
        else if (newSt == "offline") { //if a bot became offline
            //@ts-ignore
            oldPresence.member.guild.channels.cache.get(config.channel).send(`<@&${config.role}>`, { embed: { title: "Bot went offline!", description: `${oldPresence.member} (${oldPresence.user.tag}) just went offline!`, color: "RED", thumbnail: { url: oldPresence.user.avatarURL({ format: "png", size: 1024 }) }, timestamp: new Date(Date.now()) } });
        }
        else
            return;
    }
};
