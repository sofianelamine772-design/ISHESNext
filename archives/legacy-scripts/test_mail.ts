import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { getFournituresKindsToSend } from './src/lib/presentiel-fournitures-email';
console.log('Testing kinds:');
console.log(getFournituresKindsToSend(['1', '10', '26'])); // Should return ['prepa', 'elem']
