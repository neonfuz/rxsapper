import * as sapper from '@sapper/app';
import getDb from './db.ts';

const db = getDb();

sapper.start({
	target: document.querySelector('#sapper')
});
