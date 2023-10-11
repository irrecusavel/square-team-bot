import { ButtonInteraction, ChatInputCommandInteraction, Client, ClientOptions, Routes, StringSelectMenuInteraction } from 'discord.js';
import fs from 'fs';
import { Action, Command, Event } from './interfaces/discord';
import axios from 'axios';
import database from './util/Database/Main';

const ReadDirectory = <T>(path: string) => {

    const files: T[] = []

    for (const filename of fs.readdirSync(`./dist/${path}`)) {

        const stat = fs.statSync(`./dist/${path}/${filename}`);

        if (stat.isDirectory()) files.push(...ReadDirectory<T>(`${path}/${filename}`));
        else files.push(require(`./${path}/${filename}`).default);

    }

    return files;
}

class CustomClient extends Client {

    commands: Command[] = [];
    _actions: Action[] = [];
    utils = {
        replies: {
            notAuthorized: {
                ephemeral: true,
                embeds: [{
                    color: 0xff0000,
                    description: `:x: | You don't have permission to perform this action.`
                }]
            },
            UpdateApplication: async (client: this, int: ButtonInteraction, data: any, action: "start" | "stop" | "restart") => {

                const row: typeof int.message.components[0] = JSON.parse(JSON.stringify(int.message.components[0].toJSON()))
                // @ts-ignore
                for (let i = 0; i < row.components.length - 2; i++) row.components[i].disabled = true;

                await int.update({ components: [row, ...int.message.components.slice(1)] })

                const res = await axios.post(`/apps/${data.id}/${action}`)

                if (res.status !== 200) return int.editReply({
                    embeds: [{
                        color: 0xFF0000,
                        description: `:x: | An error ocurred while ${{ start: "starting", stop: "stopping", restart: "restarting" }[action]} your application...\n\`\`\`json\n${res.data || res.statusText}\n\`\`\``
                    }],
                    components: []
                })

                return await this._actions.find(x => x.name === 'app')!.selects?.string?.(client, int as unknown as StringSelectMenuInteraction, { ...data, sec: true });

            },
            moderators: async (client: this, int: ChatInputCommandInteraction | ButtonInteraction, data: any = { n: "modlist", a: int.user.id, i: 0 }) => {

                if (int.user.id !== client.application?.owner?.id) return int.reply(client.utils.replies.notAuthorized);

                const i = data.i;
                const moderator = database.data.users[i];
                const body = database.data.users.length ? {
                    embeds: [{
                        description:
                            `> Listing moderator ${i + 1}/${database.data.users.length}\n` +
                            `> Moderator: <@${moderator.id}>\n` +
                            "> Applications: " + moderator.apps.length + "\n" +
                            "\n" +
                            moderator.apps.map(app =>
                                `> \`${app.id === "*" ? "All applications" : app.id}\` - ${app.permissions.map(perm => perm[0] + perm.slice(1).toLowerCase()).join(", ")}`
                            ).join("\n")
                    }],
                    components: [{
                        type: 1,
                        components: [
                            {
                                type: 2,
                                style: 2,
                                emoji: { name: "⬅" },
                                custom_id: JSON.stringify({ ...data, i: i - 1 }),
                                disabled: i === 0
                            },
                            {
                                type: 2,
                                style: 2,
                                emoji: { name: "➡" },
                                custom_id: JSON.stringify({ ...data, i: i + 1 }),
                                disabled: i === database.data.users.length - 1
                            },
                            {
                                type: 2,
                                style: 4,
                                emoji: { name: "🗑️" },
                                custom_id: JSON.stringify({ ...data, n: "modrm", t: moderator.id })
                            }
                        ]
                    }]
                } : {
                    embeds: [{
                        color: 0xFFFF00,
                        description: `:warning: | You don't have moderators, you can add one by using \`/modadd\` or \`/apps\` command`
                    }],
                    components: []
                }

                if (int.isCommand()) return int.reply(body)
                else return int.update(body)

            }
        }
    }

    constructor(options: ClientOptions & { token: string }) {
        super(options)
        this.EventHandler();
        this.CommandHandler();
        this.ActionHandler();
        this.once('ready', this.Configure);
        this.login(options.token).catch(e => {

            if (e.code !== "TokenInvalid") throw e;

            console.error("Your env.DISCORD_TOKEN is invalid. Please re-configure.")
            process.exit()
        })
    }

    private async Configure() {

        const res = await axios.get('/user');

        this.application!.owner = await this.users.fetch(res.data.response.user.id)

    }

    private EventHandler() {
        for (const event of ReadDirectory<Event>("events")) this.on(event.name, event.listener.bind(null, this))
    }

    private CommandHandler() {
        this.commands = ReadDirectory<Command>('commands');

        const slash: Command['data'][] = [];

        for (const command of this.commands) slash.push(command.data.setName(command.name).setDescription(command.description))

        this.once('ready', async () => {
            if (process.env.GUILD_ID) await this.rest.put(Routes.applicationGuildCommands(this.user!.id, process.env.GUILD_ID), { body: slash })
            else if (!database.data.commandsInDiscord) {
                await this.rest.put(Routes.applicationCommands(this.user!.id), { body: slash })
                database.data.commandsInDiscord = true;
            }
        })

    }

    private ActionHandler() {
        this._actions = ReadDirectory<Action>('actions');
    }

}

export {
    CustomClient
};