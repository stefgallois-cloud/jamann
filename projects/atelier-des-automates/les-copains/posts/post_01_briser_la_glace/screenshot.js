const puppeteer = require("puppeteer-core");
const path = require("path");

const CHROME = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const HTML_FILE = path.resolve(__dirname, "slides.html");
const SLIDES = ["s1", "s2", "s3", "s4", "s5", "s6"];

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-web-security"]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 1 });
  await page.goto(`file:///${HTML_FILE.replace(/\\/g, "/")}`, { waitUntil: "networkidle0" });

  // Attendre que les polices Google Fonts soient chargées
  await page.evaluateHandle("document.fonts.ready");
  await new Promise(r => setTimeout(r, 800));

  for (let i = 0; i < SLIDES.length; i++) {
    const id = SLIDES[i];
    const el = await page.$(`#${id}`);
    if (!el) {
      console.warn(`⚠️ #${id} non trouvé`);
      continue;
    }
    const num = String(i + 1).padStart(2, "0");
    const outPath = path.join(__dirname, `slide_${num}.png`);
    await el.screenshot({ path: outPath });
    console.log(`✅ slide_${num}.png`);
  }

  await browser.close();
  console.log("🎉 6 slides générés — prêts pour Facebook.");
})();
