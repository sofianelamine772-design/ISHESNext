import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import { maybeSendPresentielFournituresEmail } from './src/lib/mail';
import { CLASS_ID_TO_UUID } from './src/lib/presentiel-data';

async function run() {
  const email = "elamine.benam11@gmail.com";
  const classRefs = [CLASS_ID_TO_UUID[1]];
  console.log("Sending to", email, "with refs", classRefs);
  
  const res = await maybeSendPresentielFournituresEmail(email, { classRefs });
  console.log("Result:", res);
}
run();
