import {
    createRxDatabase,
    addRxPlugin,
} from 'rxdb';
import cfg from '../package.json';
import collections from './collections';
import {onMount} from 'svelte';

const options = {
    name: cfg.name,
    adapter: 'idb'
};

addRxPlugin(require('pouchdb-adapter-http'));
addRxPlugin(require('pouchdb-adapter-idb'));

let dbPromise = null;
const _create = async syncURL => {
    console.log('Database Service: creating database...');
    const db = await createRxDatabase(options);
    window['db'] = db;
    console.log('Database Service: created database.');

    console.log('Database Service: creating collections...');
    await db.addCollections(collections);
    console.log('Database Service: created collections.');

    console.log('Database Service: syncing databases...')
    Object.keys(collections).forEach(name => db[name].sync({
        remote: syncURL + name + '/'
    }))

    return db;
}

export const getDb = () => {
    const syncURL=`http://${window.location.hostname}:5984/`
    if (!dbPromise) dbPromise = _create(syncURL);
    return dbPromise;
}

export const withDb = fn => {
    onMount(async () => {
        const db = await getDb();
        fn(db);
    });
}

export const handleChange = item => e => {
    let value = e.target.value;
    if (e.target.type === 'number')
        value = Number(value);
    item.atomicPatch({ [e.target.name]: value })
}

export const handleRemove = item => () => item.remove();
