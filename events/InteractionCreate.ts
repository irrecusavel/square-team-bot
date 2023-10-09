import { BaseInteraction, ChatInputCommandInteraction } from "discord.js";
import { Event } from "../interfaces/discord";

const obj: Event = {
    name: "interactionCreate",
    listener: async (client, int: BaseInteraction) => {
        
        if (int.isCommand()) {

            const command = client.commands.find(x => x.name === int.commandName);
            
            command?.handler(client, int as ChatInputCommandInteraction)
            
        }

    }
}

export default obj;