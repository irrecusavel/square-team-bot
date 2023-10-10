import { SlashCommandBuilder } from "discord.js";
import { Command } from "../../interfaces/discord";

const obj: Command = {
    name: "modadd",
    description: "Add a moderator to your square cloud applications",
    handler: async (client, int) => {

        if (int.user.id !== client.application?.owner?.id) return int.reply(client.utils.replies.notAuthorized);

        return await int.reply({
            ephemeral: true,
            embeds: [{
                color: 0x00ff00,
                description:
                    "Add moderator for all your application(s)\n" +
                    "\n" +
                    "**User**: Not defined\n" +
                    "**Permissions**: Not defined\n" +
                    "\n" +
                    "**OBS**: This command will allow a user to manage **all** of your applications. If you want to select a user to manage a single application, please use \`/apps\` command"
            }],
            components: [{
                type: 1,
                components: [{
                    type: 5,
                    custom_id: JSON.stringify({ n: "modadd" })
                }]
            }]
        })
    },
    data: new SlashCommandBuilder()
}

export default obj;