import { BaseInteraction, ButtonInteraction, ChatInputCommandInteraction } from "discord.js";
import { Event } from "../interfaces/discord";
import database from '../util/Database/Main';

const obj: Event = {
    name: "interactionCreate",
    listener: async (client, int: BaseInteraction) => {

        if (int.isCommand()) {

            const command = client.commands.find(x => x.name === int.commandName);

            if (
                !command?.freeToUse &&
                int.user.id !== client.application?.owner?.id &&
                !database.data.users.find(x => x.id === int.user.id)
            ) return await int.reply(client.utils.replies.notAuthorized);

            return await command?.handler(client, int as ChatInputCommandInteraction)

        }

        /**
         * A partir daqui assumimos que é uma action.
         */
        
        const data = await JSON.parse((int as ButtonInteraction).customId);
        const action = client._actions.find(x => x.name === data.n);

        if (data.a !== int.user.id) return await (int as ButtonInteraction).reply(client.utils.replies.notAuthorized);
        if (int.isStringSelectMenu()) action?.selects?.string(client, int, data);
        
    }
}

export default obj;