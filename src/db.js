import {
    createRxDatabase,
    addRxPlugin,
} from 'rxdb';
import cfg from '../package.json';
import collections from './collections';

const options = {
    name: cfg.name,
    adapter: 'idb'
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

export const handleChange = item => e => {
    let value = e.target.value;
    if (e.target.type === 'number')
        value = Number(value);
    item.atomicPatch({ [e.target.name]: value })
}

export const handleRemove = item => () => item.remove();
