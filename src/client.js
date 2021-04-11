import * as sapper from '@sapper/app';
import getDb from './db.js';

const db = getDb();

sapper.start({
	target: document.querySelector('#sapper')
});
