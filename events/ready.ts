import { Event } from "../interfaces/discord";

const obj: Event = {
    name: "ready",
    listener: async (client) => {
        console.info("I'm online as " + client.user?.tag);
    }
}

export default obj;