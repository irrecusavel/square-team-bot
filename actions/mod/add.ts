import { Action } from "../../interfaces/discord";
import database from '../../util/Database/Main';
import { Permissions } from "../../util/Database/Schema";

const obj: Action = {
    name: "modadd",
    selects: {
        user: async (client, int, data) => {

            if (int.user.id === int.values[0]) return int.reply({ ephemeral: true, embeds: [{ description: "You already have all permissions!" }] })
            if (int.users.first()?.bot) return int.reply({ ephemeral: true, embeds: [{ color: 0xFFFF00, description: "Bots cannot manage applications!" }] })

            return await int.update({
                embeds: [{
                    color: 0x00ff00,
                    description:
                        `Add moderator for ${data.id ? "application " + data.id : "all your applications"}\n` +
                        "\n" +
                        `**User**: <@${int.values[0]}>\n` +
                        "**Permissions**: Not defined\n" +
                        "\n" +
                        (data.id ? "" : "**OBS**: This command will allow a user to manage **all** of your applications. If you want to select a user to manage a single application, please use \`/apps\` command")
                }],
                components: [{
                    type: 1,
                    components: [{
                        type: 3,
                        custom_id: JSON.stringify({ n: "modadd", id: data.id, t: int.values[0] }),
                        placeholder: "Select permissions",
                        options: [
                            { emoji: { name: "▶️" }, value: "START", label: "Start application" },
                            { emoji: { name: "🔂" }, value: "RESTART", label: "Restart application" },
                            { emoji: { name: "⏹️" }, value: "STOP", label: "Stop application" },
                            { emoji: { name: "📟" }, value: "LOGS", label: "Get log/terminal of application" },
                            { emoji: { name: "💾" }, value: "BACKUP", label: "Get a backup of application" }
                        ],
                        max_values: 5
                    }]
                }]
            })
        },
        string: async (client, int, data) => {

            const oldUser: typeof database.data.users[0] = JSON.parse(JSON.stringify(database.data.users.find(x => x.id === data.t) || {}));

            if (oldUser.apps?.length >= 20) return int.reply({
                embeds: [{
                    color: 0xFFFF00,
                    description: "The user reached the limit of 20 applications to moderate."
                }]
            })
            database.data.users = database.data.users.filter(x => x.id !== data.t)
            database.data.users.push({
                id: data.t,
                apps: [
                    ...oldUser.apps,
                    {
                        id: data.id || "*",
                        permissions: int.values as unknown as Permissions[]
                    }
                ]
            })

            await int.update({
                embeds: [{
                    color: 0x00FF00,
                    description: `✅ | Now <@${data.t}> can manage ${data.id ? "the application " + data.id : "all of your applications"}`
                }],
                components: []
            })
        }
    }
}

export default obj;