"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("./classes");
const config_json_1 = __importDefault(require("../config.json"));
let client = new classes_1.Client({
    shards: "auto",
    fetchAllMembers: true
}, config_json_1.default);
client.start();
