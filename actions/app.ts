import axios from "axios";
import { Action } from "../interfaces/discord";

const obj: Action = {
    name: "app",
    selects: {
        string: async (client, int, data) => {

            const res = await axios.get("/apps/" + int.values[0]);
            const res2 = await axios.get(`/apps/${int.values[0]}/status`);
            const app = res.data.response.app;
            const status = res2.data.response

            if (res.status === 404 || res2.status === 404) return await int.reply({ ephemeral: true, embeds: [{ color: 0xFFFF00, description: `:warning: | Maybe this application was deleted` }] })

            return await int.update({
                embeds: [{
                    color: 0x00FF00,
                    author: {
                        name: app.custom || app.name,
                        url: app.isWebsite ? "https://" + app.custom || app.domain : undefined,
                        icon_url: app.avatar
                    },
                    thumbnail: { url: app.avatar },
                    fields: [
                        { name: "CPU", value: status.cpu },
                        { name: "Memory", value: `${status.ram}MB / ${app.ram}MB` },
                        { name: "Status", value: { running: "Em execução" }[status.status as 'running'] || status.status },
                        { name: "Uptime", value: `<t:${Math.floor(status.uptime / 1000)}:R>` },
                        { name: "Storage (SSD)", value: status.storage },
                        { name: "Cluster", value: app.cluster.toUpperCase() },
                        { name: "Network (Total)", value: status.network.total },
                        { name: "Network (now)", value: status.network.now },
                        { name: "Requests", value: status.requests + "/???" },
                    ].map(x => ({ ...x, inline: true }))
                }]
            })
        },
    }
}

export default obj;