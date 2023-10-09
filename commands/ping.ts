import { SlashCommandBuilder } from "discord.js";
import { Command } from "../interfaces/discord";

const obj: Command = {
    name: "ping",
    description: "A command to get the discord ping",
    handler: async (client, int) => {
        return await int.reply({
            embeds: [{
                color: 0x00ff00,
                description: `:arrow_right: | **Discord WS Ping**: \`${client.ws.ping}ms\``
            }]
        })
    },
    data: new SlashCommandBuilder()
}

export default obj;