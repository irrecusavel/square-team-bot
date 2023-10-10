import { Action } from "../../interfaces/discord";

const obj: Action = {
    name: "stop",
    checkPermission: "STOP",
    button: async (client, int, data) => client.utils.replies.UpdateApplication(client, int, data, 'stop')
}

export default obj;