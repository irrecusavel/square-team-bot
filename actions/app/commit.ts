import { ChannelType, TextChannel } from "discord.js";
import { Action } from "../../interfaces/discord";
import axios from "axios";

const obj: Action = {
    name: "commit",
    checkPermission: "COMMIT",
    button: async (client, int, data) => {

        const channel = int.channel as TextChannel;
        const res = await axios.get(`/apps/${data.id}`);
        const thread = await channel.threads.create({
            name: "Commit - " + int.user.username + " - " + res.data.response.app.name,
            invitable: false,
            reason: `Create commit on Square Cloud application ID ${data.id} (Requested by user id ${int.user.id})`,
            type: ChannelType.PrivateThread
        })

        await int.reply({ embeds: [{ description: `Thread created! Commit on ${thread.url}` }], ephemeral: true })
        await thread.send({
            content: `${int.user}`,
            embeds: [{
                color: 0x0000FF,
                description: `Please, send the file to commit here`
            }]
        })

        client.CommitCache.push({
            threadId: thread.id,
            appId: data.id,
            userId: int.user.id,
            timeout: setTimeout(async() => {
                await thread.delete().catch(() => { })
                client.CommitCache = client.CommitCache.filter(x => x.threadId !== thread.id)
            }, 1000 * 60 * 5)
        })
    }
}

export default obj;