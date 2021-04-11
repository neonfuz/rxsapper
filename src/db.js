import {
    createRxDatabase,
    addRxPlugin,
} from 'rxdb';

const options = {
    name: 'rxsapper',
    adapter: 'idb'
};

const collections = {
    example: {
        schema: {
            title: 'example schema',
            description: 'schema for an example object',
            version: 0,
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    primary: true
                },
                count: {
                    type: 'number'
                }
            }
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
