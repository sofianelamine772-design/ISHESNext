import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { resolveFournituresPdfPath, FOURNITURES_PDF } from './src/lib/presentiel-fournitures-email';
import fs from 'fs';

const p1 = resolveFournituresPdfPath('prepa');
const p2 = resolveFournituresPdfPath('elem');

console.log('Prepa:', p1, p1 ? fs.existsSync(p1) : false);
console.log('Elem:', p2, p2 ? fs.existsSync(p2) : false);
