export type Permissions = 'RESTART' | 'STOP' | 'START' | 'BACKUP' | 'LOGS' | 'COMMIT' | 'DELETE'
export type DB = {
    commandsInDiscord?: boolean,
    users: {
        id: string,
        apps: {
            id: string,
            permissions: Permissions[]
        }[]
    }[]
}