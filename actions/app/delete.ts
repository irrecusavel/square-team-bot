import axios from "axios";
import { Action } from "../../interfaces/discord";
import { promisify, inspect } from 'util'

const wait = promisify(setTimeout)
const obj: Action = {
    name: "delete",
    checkPermission: "DELETE",
    button: async (client, int, data) => {

        if (data.c === false) return int.message.delete()
        if (data.c === undefined) return int.update({
            content: "",
            embeds: [{
                color: 0x00FF00,
                description:
                    `:warning: | **This is a destructive action!**\n` +
                    `:scream: | **This will permanently delete your application!**`
            }],
            components: [{
                type: 1,
                components: [{
                    type: 2,
                    style: 4,
                    label: "I understand the risks. Delete the application.",
                    emoji: { name: "✅" },
                    custom_id: JSON.stringify({ ...data, c: true })
                }]
            },
            {
                type: 1,
                components: [{
                    type: 2,
                    style: 3,
                    label: "Are you coming crazy? Keep this application!",
                    emoji: { name: "❌" },
                    custom_id: JSON.stringify({ ...data, c: false })
                }]
            }]
        })

        await int.update({ embeds: [{ color: 0xFFFF00, description: "Wait a moment..." }], components: [] });
        await axios.get(`/apps/${data.id}/backup`);
        await wait(1000);

        const res = await axios.delete(`/apps/${data.id}/delete`);

        if (res.status !== 200) return int.editReply({
            embeds: [{
                color: 0xFF0000,
                description:
                    `❌ | **An error ocurred while deleting your application**\n` +
                    `\`\`\`json\n` +
                    `${inspect(res.data, { depth: Infinity })}\n` +
                    `\`\`\``
            }]
        })

        return int.editReply({ embeds: [{ color: 0x00FF00, description: `✅ | **Application deleted succesfully!**` }] });
    }
}

export default obj;