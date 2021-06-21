import { Client } from "./classes"
import config from "../config.json"

let client = new Client({
    shards: "auto",
    fetchAllMembers: true
}, config)
client.start()
