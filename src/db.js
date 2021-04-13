import {
    createRxDatabase,
    addRxPlugin,
} from 'rxdb';
import cfg from '../package.json';

const options = {
    name: cfg.name,
    adapter: 'idb'
};

const collections = {
    counters: {
        schema: {
            title: 'counters schema',
            description: 'schema for a named counter',
            version: 0,
            type: 'object',
            properties: {
                order: {
                    type: 'string',
                    primary: true
                },
                name: {
                    type: 'string'
                },
                count: {
                    type: 'number'
                }
            }
        },
        migrationStrategies: {
        }
    }
};

addRxPlugin(require('pouchdb-adapter-idb'));

let dbPromise = null;
const _create = async () => {
    console.log('Database Service: creating database...');
    const db = await createRxDatabase(options);
    window['db'] = db;
    console.log('Database Service: created database.');

    console.log('Database Service: creating collections...');
    await db.addCollections(collections);
    console.log('Database Service: created collections.');

    return db;
}

export default () => {
    if (!dbPromise) dbPromise = _create();
    return dbPromise;
}
