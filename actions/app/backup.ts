import axios from "axios";
import { Action } from "../../interfaces/discord";

const obj: Action = {
    name: "backup",
    checkPermission: "BACKUP",
    button: async (client, int, data) => {

        await int.deferReply({ ephemeral: true });

        const res = await axios.get(`/apps/${data.id}/backup`)

        if (res.status !== 200) return int.reply({ embeds: [{ color: 0xFF0000, description: `:x: | HTTP error ${res.status}.\n\`\`\`\n${res.data}\n\`\`\`` }] })

        const url = res.data?.response?.downloadURL;

        return await int.editReply({
            embeds: [{ description: "**Sucesso!** Cópia de segurança acessível no botão abaixo.", color: 0x01F7FE }],
            components: [{ type: 1, components: [{ type: 2, style: 5, url, label: "Acessar cópia de segurança" }] }]
        });

    }
}

export default obj;