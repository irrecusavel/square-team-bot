import { ChannelType, Message } from "discord.js";
import { Event } from "../interfaces/discord";
import FormData from 'form-data';
import axios from "axios";
import https from 'https';
import { createWriteStream, readFileSync, unlinkSync } from "fs";

const obj: Event = {
    name: "messageCreate",
    listener: async (client, message: Message) => {

        if (message.channel.type !== ChannelType.PrivateThread || message.author.bot) return;

        const CommitData = client.CommitCache.find(x => x.threadId === message.channelId);
        const attachment = message.attachments.first();
        const filename = `./temp-commit-file-${message.channel.id}`

        if (CommitData?.userId !== message.author.id) return;
        if (!attachment) return message.channel.send({ embeds: [{ color: 0xff0000, description: "It seems that your message doesn't have any files..." }] })

        const form = new FormData();
        const file = createWriteStream(filename)

        https.get(attachment.url, async res => {

            res.pipe(file)

            file.on("finish", async () => {

                form.append("file", readFileSync(filename))

                unlinkSync(filename)

                console.log('a')
                
                const data = await axios.post(`/apps/${CommitData.appId}/commit`, form)

                console.log(data)                

            })
        })
    }
}

export default obj;