import { CustomClient } from "../CustomClient"

type Event = {
    name: string
    listener: (client: CustomClient, ...args: any) => Promise<any>
}