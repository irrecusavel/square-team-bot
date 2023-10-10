import { Action } from "../../interfaces/discord";
import database from '../../util/Database/Main';

const obj: Action = {
    name: "modrm",
    button: async (client, int, data) => {
        
        database.data.users = database.data.users.filter(x => x.id !== data.t);

        return int.update({
            embeds: [{ color: 0xFFFF00, description: "Moderator removed successfully" }],
            components: []
        })
    }
}

export default obj;