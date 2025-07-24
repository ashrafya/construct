const express = require('express');
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const upload = require('../../frontend/src/middleware/image-upload.js'); // Import multer middleware
const router = express.Router();
const generateInformationPageReport = require('../helpers/InformationPageReport.js');

/**
 * Converts HTML to PDF and returns a Buffer.
 * @param {string} html - The HTML string to convert.
 * @returns {Promise<Buffer>} - PDF buffer.
 */
async function htmlToPdfBuffer(html) {
  const baseDir = path.dirname(path.resolve(__dirname, '../helpers/InformationPageReport.html'));
  const browser = await puppeteer.launch({
    args: ['--allow-file-access-from-files']
  });
  const page = await browser.newPage();

  // Create temporary HTML file to preserve relative paths
  const tempHtmlPath = path.join(baseDir, `temp-${Date.now()}.html`);
  fs.writeFileSync(tempHtmlPath, html);

  try {
    await page.goto(`file://${tempHtmlPath}`, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    await page.evaluate(async () => {
      const selectors = [
        ...document.querySelectorAll('img'),
        ...document.querySelectorAll('*[style*="background-image"]')
      ];
      await Promise.all(selectors.map(el => {
        if (el.complete) return Promise.resolve();
        return new Promise((resolve) => {
          el.addEventListener('load', resolve);
          el.addEventListener('error', resolve);
        });
      }));
    });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true
    });
    return pdfBuffer;
  } finally {
    fs.unlinkSync(tempHtmlPath);
    await browser.close();
  }
}

router.post('/', async (req, res) => {
  const { formData, images } = req.body;
  console.log("running in create-pdf.js");
  console.log("images:", images);
  console.log("formData:", formData);

  try {
    const html = generateInformationPageReport(formData, images);
    if (!html) {
      return res.status(400).json({ error: 'Failed to generate HTML content' });
    }

    const pdfBuffer = await htmlToPdfBuffer(html);

    if (Array.isArray(images)) {
      for (const img of images) {
        const filePath = img.url;
        if (fs.existsSync(filePath)) {
          try {
            fs.unlinkSync(filePath);
          } catch (err) {
            console.error(`Failed to delete file ${filePath}:`, err);
          }
        }
      }
    }
    res
      .set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="fieldlens-report.pdf"',
      })
      .send(pdfBuffer);
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
});

module.exports = router;
