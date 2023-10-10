import { Action } from "../../interfaces/discord";

const obj: Action = {
    name: "modlist",
    button: async (client, int, data) => client.utils.replies.moderators(client, int, data)
}

export default obj;