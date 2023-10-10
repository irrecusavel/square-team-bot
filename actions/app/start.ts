import { Action } from "../../interfaces/discord";

const obj: Action = {
    name: "start",
    checkPermission: "START",
    button: async (client, int, data) => {
        await int.update({ 
            embeds: [{ color: 0xFFFF00, description: "Iniciando aplicação..." }]
        })
    }
}

export default obj;