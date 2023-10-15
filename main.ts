import { CustomClient } from './CustomClient'
import { config as configEnv } from 'dotenv';
import axios from 'axios';
import './util/Prototypes';
import './util/Database/Main';
//import { Partials } from 'discord.js';

configEnv();

axios.defaults.baseURL = "https://api.squarecloud.app/v2"
axios.defaults.headers.common.Authorization = process.env.SQUARE_CLOUD_API_KEY
axios.interceptors.response.use((response) => response, (error) => {
    
    if (error.response?.status === 401) {
        console.error("Your env.SQUARE_CLOUD_API_KEY is invalid. Please re-configure.");
        process.exit()
    }
    
    return error.response;
    
})

new CustomClient({
    intents: ["Guilds"],
    token: process.env.DISCORD_TOKEN!,
})