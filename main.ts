import { CustomClient } from './CustomClient'
import { config as configEnv } from 'dotenv';
import './util/Prototypes';

configEnv();

new CustomClient({
    intents: [],
    token: process.env.DISCORD_TOKEN!
})