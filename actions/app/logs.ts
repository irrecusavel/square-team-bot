import axios from "axios";
import { Action } from "../../interfaces/discord";
import { MessageReplyOptions } from "discord.js";

const obj: Action = {
    name: "logs",
    checkPermission: "LOGS",
    button: async (client, int, data) => {

        await int.deferReply({ ephemeral: true });

        const res = await axios.get(`/apps/${data.id}/logs`)
        const logs = res.data?.response?.logs || "You don't have logs and/or we were unable to collect your logs, please try again later.";
        const body: MessageReplyOptions = { content: `\`\`\`\n${logs.slice(logs.length - 1992, logs.length)}\n\`\`\``};

        return await int.editReply(body);

    }
}

export default obj;