import { SlashCommandBuilder } from "discord.js";
import { Command } from "../../interfaces/discord";

const obj: Command = {
    name: "modlist",
    description: "List and manage your moderators",
    handler: async (client, int) => client.utils.replies.moderators(client, int),
    data: new SlashCommandBuilder()
}

export default obj;