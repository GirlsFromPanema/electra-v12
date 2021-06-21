"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Command {
    constructor({ name, description = "No description provided", owner = false, aliases = [], }) {
        this.name = name;
        this.description = description;
        this.owner = owner;
        this.aliases = aliases;
    }
}
exports.default = Command;
;
