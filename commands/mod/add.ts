import { SlashCommandBuilder } from "discord.js";
import { Command } from "../../interfaces/discord";

const obj: Command = {
    name: "modadd",
    description: "Add a moderator to your square cloud applications",
    handler: async (client, int) => {

        if (int.user.id !== client.application?.owner?.id) return int.reply(client.utils.replies.notAuthorized);

        return await int.reply({
            embeds: [{
                color: 0x00ff00,
                description:
                    "Add moderator for your application(s)\n" +
                    "\n" +
                    "**User**: Not defined\n" +
                    "**Applications**: Not defined"
            }],
            components: [{
                type: 1,
                components: [{
                    type: 5,
                    custom_id: JSON.stringify({ n: "modadd", a: int.user.id })
                }]
            }]
        })
    },
    data: new SlashCommandBuilder()
}

export default obj;