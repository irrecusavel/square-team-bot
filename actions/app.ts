import axios from "axios";
import { Action } from "../interfaces/discord";
import { StringSelectMenuComponent } from "discord.js";

const _components = [
    {
        type: 1, components: [
            {
                type: 2,
                style: 3,
                emoji: { name: "▶️" },
                custom_id: "start"
            },
            {
                type: 2,
                style: 1,
                emoji: { name: "🔂" },
                custom_id: "restart"
            },
            {
                type: 2,
                style: 4,
                emoji: { name: "⏹️" },
                custom_id: "stop"
            },
            {
                type: 2,
                style: 2,
                emoji: { name: "📟" },
                custom_id: "logs"
            },
            {
                type: 2,
                style: 2,
                emoji: { name: "💾" },
                custom_id: "backup"
            }
        ]
    }
]

const obj: Action = {
    name: "app",
    selects: {
        string: async (client, int, data) => {

            const res = await axios.get("/apps/" + int.values[0]);
            const res2 = await axios.get(`/apps/${int.values[0]}/status`);
            const app = res.data.response.app;
            const status = res2.data.response

            if (res.status === 404 || res2.status === 404) return await int.reply({ ephemeral: true, embeds: [{ color: 0xFFFF00, description: `:warning: | Maybe this application was deleted` }] })

            const components: typeof _components = JSON.parse(JSON.stringify(_components))

            for (const component of components[0].components) component.custom_id = JSON.stringify({ a: int.user.id, id: app.id, n: component.custom_id })
            // @ts-ignore
            components.push(...int.message.components.filter(x => x.components[0].type === 3).map(x => x.toJSON()))

            for (const _component of components.filter(x => x.components[0].type === 3)) {
                const component = _component as unknown as { type: 1, components: StringSelectMenuComponent[] };
                for (const option of component.components[0].options) option.default = option.value === int.values[0]
            }

            return await int.update({
                embeds: [{
                    color: 0x00FF00,
                    author: {
                        name: app.custom || app.name,
                        url: app.isWebsite ? "https://" + app.custom || app.domain : undefined,
                        icon_url: app.avatar
                    },
                    thumbnail: { url: app.avatar },
                    description: app.desc ? `:page_with_curl: ${app.desc}` : undefined,
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
                }],
                components
            })
        },
    }
}

export default obj;