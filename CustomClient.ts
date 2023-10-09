import { Client, ClientOptions } from 'discord.js';
import fs from 'fs';
import { Event } from './interfaces/discord';
import axios from 'axios';

class CustomClient extends Client {

    constructor(options: ClientOptions & { token: string }) {
        super(options)
        this.EventHandler();
        this.once('ready', this.Configure);
        this.login(options.token).catch(e => {
            console.error("Your env.DISCORD_TOKEN is invalid. Please re-configure.")
            process.exit()
        })
    }

    private async Configure() {

        const res = await axios.get('/user');

        this.application!.owner = await this.users.fetch(res.data.response.user.id)

    }

    private EventHandler() {
        for (const filename of fs.readdirSync('./dist/events')) {
            const data = require("./events/" + filename).default as Event;
            this.on(data.name, data.listener)
        }
    }

}

export {
    CustomClient
};