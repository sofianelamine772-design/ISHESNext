import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { getFournituresKindsToSend } from './src/lib/presentiel-fournitures-email';
import { CLASS_ID_TO_UUID } from './src/lib/presentiel-data';
console.log('UUID for class 1:', CLASS_ID_TO_UUID[1]);
console.log(getFournituresKindsToSend([CLASS_ID_TO_UUID[1]])); 
