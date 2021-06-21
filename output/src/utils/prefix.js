"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (msg, client) => {
    let p = client.config.prefix;
    let l = [`<@!${client.user.id}>`, `<@${client.user.id}>`];
    if (l.includes(msg.content)) {
        msg.channel.send(`
        <:Arrow:855707077812551750> My prefix is \`${p}\`\n<:Arrow:855707077812551750> Run *help for more!`);
    }
    l.forEach(r => {
        if (msg.content.toLowerCase().startsWith(r.toLowerCase())) {
            p = r;
        }
    });
    if (!msg.content.startsWith(p))
        p = undefined;
    return p;
};
