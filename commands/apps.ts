import { SlashCommandBuilder, StringSelectMenuComponentData } from "discord.js";
import { Command } from "../interfaces/discord";
import axios from "axios";
import database from '../util/Database/Main';
import { Application } from "../interfaces/square";

const obj: Command = {
    name: "apps",
    description: "View and manage your applications hosted in Square Cloud",
    handler: async (client, int) => {

        const info = await axios.get("/user");
        const selects: StringSelectMenuComponentData[] = [];
        let applications = info.data.response.applications as Application[];

        if (int.user.id !== client.application?.owner?.id) {
            const mod = database.data.users.find(x => x.id === int.user.id);

            if (!mod) return await int.reply(client.utils.replies.notAuthorized);

            applications = applications.filter(app => mod.apps.some(x => x.id === app.id))
        }

        for (let i = 0; i < applications.length; i++) {

            const index = Math.floor(i / 25);
            const app = applications[i];

            if (!selects[index]) selects[index] = {
                type: 3,
                customId: `${JSON.stringify({ n: "app", a: int.user.id, i: index })}`,
                placeholder: "Select an application",
                options: []
            }

            selects[index].options.push({
                label: `${app.tag} (${app.lang})`,
                value: app.id + Math.random() + Math.random().toString(),
                emoji: { name: app.isWebsite? "🌐":"🤖" },
                description: "Click to manage this application"
            })
        }

        return await int.reply({
            components: selects.map(x => ({ type: 1, components: [x] }))
        })
        

    },
    data: new SlashCommandBuilder()
}

export default obj;