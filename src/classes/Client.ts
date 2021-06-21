import { Client, ClientOptions, Collection, Guild } from "discord.js"
import { readdirSync } from "fs"
import { brandingColor } from "../consts"
import Command from "./Command"
import quick from "quick.db"

type config = { token: string, prefix: string, owners: string[] }

export default class extends Client {
    config: config;
    commands: Collection<string, any>
    aliases: Collection<string, string>
    brandingColor: string;
    db: any;

    constructor(opts: ClientOptions, config: config) {
        super(opts)
        this.config = config
        this.commands = new Collection()
        this.aliases = new Collection()
        this.loadEvents()
        this.loadCommands()
        this.db = quick
        this.brandingColor = brandingColor
    }

    start() {
        this.login(this.config.token)
    }

    loadEvents() {
        const eventFiles = readdirSync(`${__dirname}/../events`).filter(file => file.endsWith('.js'));
        for (const file of eventFiles) {
            const event = require(`${__dirname}/../events/${file}`).default;
            if (event.once) {
                this.once(event.name, (...args) => event.execute(...args, this));
                console.log(`[${new Date().toISOString()}][STARTUP][EVENTS] Event ${event.name} registered! Type: once`)
            } else {
                this.on(event.name, (...args) => event.execute(...args, this));
                console.log(`[${new Date().toISOString()}][STARTUP][EVENTS] Event ${event.name} registered! Type: on`)
            }
        }
    }

    loadCommands() {
        readdirSync(`${__dirname}/../commands`)
            .filter((f) => f.endsWith(".js"))
            .forEach(async (command) => {
                //@ts-ignore
                const comm = await import(`${__dirname}/../commands/${command}`)
                const c = new comm.default(this);
                this.commands.set(c.name, c);
                c.aliases.forEach((a) => {
                    this.aliases.set(a, c.name);
                });
                console.log(`[${new Date().toISOString()}][STARTUP][COMMANDS] Command ${c.name} registered!`)
            })
    }

    isOwner(id: string): boolean {
        return this.config.owners.includes(id)
    }

    getCommand(name: string): Command {
        return this.commands.get(name) || this.commands.get(this.aliases.get(name));
    }

    parseChannelMention(str: string, guild: Guild) {
        if (!str) return;;
        if (!guild) return;
        if (!str.startsWith("<#") && !str.endsWith(">")) return;
        return guild.channels.cache.get(str.slice(2, -1))
    }

    parseRoleMention(str: string, guild: Guild) {
        if (!str) return;;
        if (!guild) return;
        if (!str.startsWith("<@&") && !str.endsWith(">")) return;
        return guild.roles.cache.get(str.slice(3, -1))
    }
}