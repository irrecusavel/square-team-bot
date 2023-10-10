import fs from 'fs';
import { DB } from './Schema';

class Database {

    data: DB = { users: [] }
    path: string = '';

    constructor(path: string, options?: { intervalToSave: number }) {

        try {
            this.path = path;
            this.data = JSON.parse(fs.readFileSync(path).toString());
        } catch (e: any) {
            if (e?.code === 'ENOENT') this.save();
            else if (e) throw e;
        }

        setInterval(() => this.save(), options?.intervalToSave || 5000);

    }

    private save = () => {

        const replacedPath = this.path.replace('.json', '.json.temp')

        fs.writeFileSync(replacedPath, JSON.stringify(this.data, null, process.env.GUILD_ID ? '  ' : undefined));
        fs.renameSync(replacedPath, this.path);

    }
}

export default new Database('db.json')