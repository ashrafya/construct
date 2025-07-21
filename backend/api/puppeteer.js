const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function htmlToPdf(html, outputPath) {
  // Get directory of the original HTML file for resolving relative paths
  const baseDir = path.dirname(path.resolve(__dirname, '../helpers/InformationPageReport.html'));
  
  const browser = await puppeteer.launch({
    args: ['--allow-file-access-from-files'] // Enable local file access
  });
  const page = await browser.newPage();

  // Create temporary HTML file to preserve relative paths
  const tempHtmlPath = path.join(baseDir, `temp-${Date.now()}.html`);
  fs.writeFileSync(tempHtmlPath, html);

  try {
    // Load from file system with proper base URL
    await page.goto(`file://${tempHtmlPath}`, { 
      waitUntil: 'networkidle0',
      timeout: 30000  // Increased timeout
    });

    // Wait for images (including CSS backgrounds)
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

    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true
    });
  } finally {
    // Clean up temporary file
    fs.unlinkSync(tempHtmlPath);
    await browser.close();
  }
}

// Usage remains the same
const pdfPath = path.join(__dirname, 'puppeteer.pdf');
const htmlContent = fs.readFileSync(
  path.join(__dirname, '../helpers/InformationPageReport.html'),
  'utf8'
);

htmlToPdf(htmlContent, pdfPath)
  .then(() => console.log('PDF generated:', pdfPath))
  .catch(err => console.error('Error generating PDF:', err));