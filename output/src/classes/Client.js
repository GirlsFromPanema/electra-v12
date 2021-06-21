"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const fs_1 = require("fs");
const consts_1 = require("../consts");
const quick_db_1 = __importDefault(require("quick.db"));
class default_1 extends discord_js_1.Client {
    config;
    commands;
    aliases;
    brandingColor;
    db;
    constructor(opts, config) {
        super(opts);
        this.config = config;
        this.commands = new discord_js_1.Collection();
        this.aliases = new discord_js_1.Collection();
        this.loadEvents();
        this.loadCommands();
        this.db = quick_db_1.default;
        this.brandingColor = consts_1.brandingColor;
    }
    start() {
        this.login(this.config.token);
    }
    loadEvents() {
        const eventFiles = fs_1.readdirSync(`${__dirname}/../events`).filter(file => file.endsWith('.js'));
        for (const file of eventFiles) {
            const event = require(`${__dirname}/../events/${file}`).default;
            if (event.once) {
                this.once(event.name, (...args) => event.execute(...args, this));
                console.log(`[${new Date().toISOString()}][STARTUP][EVENTS] Event ${event.name} registered! Type: once`);
            }
            else {
                this.on(event.name, (...args) => event.execute(...args, this));
                console.log(`[${new Date().toISOString()}][STARTUP][EVENTS] Event ${event.name} registered! Type: on`);
            }
        }
    }
    loadCommands() {
        fs_1.readdirSync(`${__dirname}/../commands`)
            .filter((f) => f.endsWith(".js"))
            .forEach(async (command) => {
            //@ts-ignore
            const comm = await Promise.resolve().then(() => __importStar(require(`${__dirname}/../commands/${command}`)));
            const c = new comm.default(this);
            this.commands.set(c.name, c);
            c.aliases.forEach((a) => {
                this.aliases.set(a, c.name);
            });
            console.log(`[${new Date().toISOString()}][STARTUP][COMMANDS] Command ${c.name} registered!`);
        });
    }
    isOwner(id) {
        return this.config.owners.includes(id);
    }
    getCommand(name) {
        return this.commands.get(name) || this.commands.get(this.aliases.get(name));
    }
    parseChannelMention(str, guild) {
        if (!str)
            return;
        ;
        if (!guild)
            return;
        if (!str.startsWith("<#") && !str.endsWith(">"))
            return;
        return guild.channels.cache.get(str.slice(2, -1));
    }
    parseRoleMention(str, guild) {
        if (!str)
            return;
        ;
        if (!guild)
            return;
        if (!str.startsWith("<@&") && !str.endsWith(">"))
            return;
        return guild.roles.cache.get(str.slice(3, -1));
    }
}
exports.default = default_1;
