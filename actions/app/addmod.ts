import { Action } from "../../interfaces/discord";

const obj: Action = {
    name: "modaddapp",
    button: async (client, int, data) => {

        if (int.user.id !== client.application?.owner?.id) return int.reply(client.utils.replies.notAuthorized);

        return int.reply({
            ephemeral: true,
            embeds: [{
                color: 0x00ff00,
                description:
                    `Add moderator for application ${data.id}\n` +
                    "\n" +
                    `**User**: Not defined\n` +
                    "**Permissions**: Not defined"
            }],
            components: [{
                type: 1,
                components: [{
                    type: 5,
                    custom_id: JSON.stringify({ n: "modadd", id: data.id }),
                    placeholder: "Select the user"
                }]
            }]
        })

    }
}

export default obj;