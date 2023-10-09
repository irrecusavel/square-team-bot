import { BaseInteraction, ChatInputCommandInteraction } from "discord.js";
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
            ) return await int.reply(client.utils.replies.notAuthorized)

            command?.handler(client, int as ChatInputCommandInteraction)

        }

    }
}

export default obj;