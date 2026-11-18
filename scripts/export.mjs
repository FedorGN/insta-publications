import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
const layout = process.argv[2] || 'essay';
const base = process.env.FIELDNOTES_URL || 'http://localhost:5173';
const browser = await chromium.launch({ headless: true });
try {
 const page = await browser.newPage({ viewport:{width:1600,height:1600},deviceScaleFactor:1 });
 await page.goto(base,{waitUntil:'networkidle'});
 await page.locator(`[data-template="${layout}"]`).click();
 await page.evaluate(async()=>{await document.fonts.ready;const el=document.querySelector('#artboard');el.style.transform='none';});
 await mkdir('output',{recursive:true});
 const out=resolve(`output/fieldnotes-${layout}.png`);
 await page.locator('#artboard').screenshot({path:out,animations:'disabled'});
 console.log(out);
} finally { await browser.close(); }
