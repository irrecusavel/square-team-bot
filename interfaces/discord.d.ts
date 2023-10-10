import { ButtonBuilder, ChatInputCommandInteraction, SlashCommandBuilder, StringSelectMenuInteraction } from "discord.js"
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

type Action = {
    name: string,
    button?: (client: CustomClient, int: ButtonBuilder, data: Record<string, any> & { n: string, a: string }) => Promise<any>
    selects?: {
        string: (client: CustomClient, int: StringSelectMenuInteraction, data: Record<string, any> & { n: string, a: string }) => Promise<any>
        //button: (client: CustomClient, int: ButtonBuilder, data: Record<string, any> & { n: string, a: string }) => Promise<any>
        //button: (client: CustomClient, int: ButtonBuilder, data: Record<string, any> & { n: string, a: string }) => Promise<any>
    }
}