import { ButtonBuilder, ButtonInteraction, ChatInputCommandInteraction, SlashCommandBuilder, StringSelectMenuInteraction, UserSelectMenuInteraction } from "discord.js"
import { CustomClient } from "../CustomClient"
import { Permissions } from "../util/Database/Schema"
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
    checkPermission?: Permissions
    button?: (client: CustomClient, int: ButtonInteraction, data: Record<string, any> & { n: string, a: string }) => Promise<any>
    selects?: {
        string?: (client: CustomClient, int: StringSelectMenuInteraction, data: Record<string, any> & { n: string, a: string }) => Promise<any>
        user?: (client: CustomClient, int: UserSelectMenuInteraction, data: Record<string, any> & { n: string, a: string }) => Promise<any>
    }
}