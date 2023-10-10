import { Action } from "../interfaces/discord";

const obj: Action = {
    name: "app",
    selects: {
        string: async (client, int, data) => {
            
            return await int.update({
                embeds: [{
                    color: 0x00FF00,
                    fields: [
                        { name: "Name", value: "teste", inline: true }
                    ]
                }]
            })
        },
    }
}

export default obj;