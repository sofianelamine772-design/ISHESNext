const fs = require('fs');
const path = './src/app/app/eleve/page.tsx';
const jsxPath = './scratch/newJsx.txt';

let content = fs.readFileSync(path, 'utf8');
const newJsx = fs.readFileSync(jsxPath, 'utf8');

// 1. Add imports
if (!content.includes('ArabicBackground')) {
  content = content.replace('import { Button } from "@/components/ui/button";', 'import { Button } from "@/components/ui/button";\nimport { ArabicBackground } from "@/components/ArabicBackground";\nimport { motion } from "framer-motion";');
}

// 2. We will replace everything from 'return (' to the end of the file.
const splitPoint = '  const installmentDetails = getInstallmentDetails();\n\n  return (';
const parts = content.split(splitPoint);

if (parts.length === 2) {
  // Combine
  fs.writeFileSync(path, parts[0] + splitPoint + '\n' + newJsx);
  console.log("Rewrite complete.");
} else {
  console.error("Split point not found");
}
