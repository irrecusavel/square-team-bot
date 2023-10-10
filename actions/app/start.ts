import { Action } from "../../interfaces/discord";

const obj: Action = {
    name: "start",
    checkPermission: "START",
    button: async (client, int, data) => client.utils.replies.UpdateApplication(client, int, data, 'start')
}

export default obj;