import { Action } from "../../interfaces/discord";

const obj: Action = {
    name: "restart",
    checkPermission: "RESTART",
    button: async (client, int, data) => client.utils.replies.UpdateApplication(client, int, data, 'restart')
}

export default obj;