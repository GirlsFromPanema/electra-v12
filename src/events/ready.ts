import { Client } from "../classes";

export default {
    name: "ready",
    once: true,
    execute(client: Client) {
        console.log(`Logged in as ${client.user.tag}!`)
       
    }
}