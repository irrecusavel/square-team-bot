import { Client, ClientOptions } from 'discord.js';
import fs from 'fs';
import { Event } from './interfaces/discord';

class CustomClient extends Client {
    constructor(options: ClientOptions & { token: string }) {
        super(options)
        this.EventHandler();
        this.login(options.token)
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