import { CustomClient } from './CustomClient'
import { config as configEnv } from 'dotenv';

configEnv();

new CustomClient({
    intents: [],
    token: process.env.DISCORD_TOKEN!
})