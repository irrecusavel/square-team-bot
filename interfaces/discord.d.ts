import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"
import { CustomClient } from "../CustomClient"

type Event = {
    name: string
    listener: (client: CustomClient, ...args: any) => Promise<any>
}

type Command = {
    name: string,
    description: string,
    freeToUse?: boolean,
    handler: (client: CustomClient, int: ChatInputCommandInteraction) => Promise<any>
    data: SlashCommandBuilder
}