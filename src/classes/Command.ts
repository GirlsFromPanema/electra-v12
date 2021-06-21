import Client from "./Client";

export default class Command {
    name: string; description: string; owner: boolean; aliases: string[]; client: Client;
    constructor({
        name,
        description = "No description provided",
        owner = false,
        aliases = [],
    }) {
        this.name = name;
        this.description = description;
        this.owner = owner;
        this.aliases = aliases;
    }
};
