export type Permissions = 'RESTART' | 'STOP' | 'START' | 'BACKUP' | 'DELETE' | 'LOGS'
export type DB = {
    users: {
        id: string,
        apps: {
            id: string,
            permissions: Permissions[]
        }[]
    }[]
}