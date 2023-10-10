import axios from "axios";
import { Action } from "../../interfaces/discord";
import app from '../app';
import { StringSelectMenuInteraction } from "discord.js";

const obj: Action = {
    name: "start",
    checkPermission: "START",
    button: async (client, int, data) => {

        const row: typeof int.message.components[0] = JSON.parse(JSON.stringify(int.message.components[0].toJSON()))
        // @ts-ignore
        for (let i = 0; i < row.components.length - 2; i++) row.components[i].disabled = true;

        await int.update({ components: [row, ...int.message.components.slice(1)] })

        const res = await axios.post(`/apps/${data.id}/start`)

        if (res.status === 200) return await app.selects?.string(client, int as unknown as StringSelectMenuInteraction, { ...data, sec: true })
        else return int.editReply({ embeds: [{ color: 0xFF0000, description: `:x: | An error ocurred while starting your application...\n\`\`\`json\n${res.data || res.statusText}\n\`\`\`` }], components: [] })

    }
}

export default obj;