"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const prefix_1 = __importDefault(require("../utils/prefix"));
exports.default = {
    name: "message",
    once: false,
    execute(msg, client) {
        if (msg.author.bot || msg.webhookID || msg.channel.type === "dm")
            return;
        let p = prefix_1.default(msg, client);
        if (!p)
            return;
        const cont = msg.content.slice(p.length).trim().split(" ");
        const c = client.getCommand(cont[0]);
        if (!c)
            return;
        if (c.owner) {
            if (!client.isOwner(msg.author.id))
                return;
        }
        let args = cont.slice(1);
        try {
            //@ts-ignore
            c.run(msg, args);
            console.log(colors_1.default.green(`[${new Date().toISOString()}][EVENT][MESSAGE] Command executed: ${c.name}`));
        }
        catch (e) {
            console.log(colors_1.default.red(`[${new Date().toISOString()}][EVENT][MESSAGE] Command failed: ${c.name}`));
            console.log(e);
        }
    }
};
