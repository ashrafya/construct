// Information Page Site Visit Report 

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// # Configure pdfkit options (path to wkhtmltopdf might be needed)
options = {
    'page-size': 'A4',
    'margin-top': '0.5in',
    'margin-right': '0.5in',
    'margin-bottom': '0.5in',
    'margin-left': '0.5in',
    'encoding': "UTF-8",
}

// # HTML template with inline CSS for precise formatting
// Function to generate PDF using pdfkit
function generatePDF() {
  const doc = new PDFDocument({
    size: 'A4',
    margin: 36 // 0.5in = 36pt
  });

  const pdfPath = path.join(__dirname, 'site_visit_report.pdf');
  const stream = fs.createWriteStream(pdfPath);
  doc.pipe(stream);

  // Header
  doc.fontSize(24).text('Luxury Hotel Complex', {align: 'center'});
  doc.moveDown(0.2);
  doc.fontSize(18).text('Site Visit Report', {align: 'center'});
  doc.moveDown(0.2);
  doc.fontSize(16).fillColor('#555').text('FFS', {align: 'center'});
  doc.moveDown(0.5);
  doc.fillColor('black').moveTo(doc.x, doc.y).lineTo(doc.page.width - doc.page.margins.right, doc.y).stroke();

  doc.moveDown();

  // Info Table
  doc.fontSize(12).text('Project Name: Luxury Hotel Complex');
  doc.text('FFS Project Number: 2018490');
  doc.text('Report ID: SV.07');
  doc.text('Author: Hassan Zahidi');
  doc.text('Reviewer: Nael Ashraf');
  doc.text('Client Name: EllisDon');
  doc.moveDown();

  doc.text('Present: Nael Ashraf-Fieldlens, Rebecca Damsteegt-SGH');
  doc.text('Weather: Sunny');
  doc.text('Temperature (°C): 24');
  doc.moveDown();

  // Disclaimer
  doc.fontSize(10).fillColor('#333').text('Disclaimer:', {underline: true});
  doc.fontSize(10).fillColor('black').text(
    'Site visits and field observations are conducted on a sampling basis, covering portions of completed and in-progress work observed at the time of each visit. These observations are not exhaustive and do not absolve the Contractor or subcontractors from their responsibilities for quality control, compliance with the construction documents, and adherence to all applicable codes and standards.',
    {align: 'justify'}
  );
  doc.moveDown();

  // Print Date
  doc.fontSize(12).text('Print Date: ' + new Date().toLocaleDateString());
  doc.moveDown();

  // Contacts
  doc.fontSize(12).text('Primary Contact', {underline: true});
  doc.text('Name: Nael Ashraf');
  doc.text('Email: 1naelashraf@gmail.com');
  doc.text('Phone: (289) 681-5460');
  doc.moveDown();

  doc.text('Secondary Contact', {underline: true});
  doc.text('Name: Yawar Ashraf');
  doc.text('Email: yawar1ashraf@gmail.com');
  doc.text('Phone: (289) 885-6099');
  doc.moveDown();

  // Photos Section
  doc.fontSize(14).fillColor('white').rect(doc.x, doc.y, doc.page.width - doc.page.margins.left - doc.page.margins.right, 20).fill('#333');
  doc.fillColor('white').text('Photos', doc.x + 5, doc.y - 18);
  doc.moveDown(1.5);

  // Photo placeholders
  doc.fillColor('black');
  doc.rect(doc.x, doc.y, 200, 100).stroke();
  doc.text('[Photo: SV.07.A]', doc.x + 60, doc.y + 40);
  doc.moveDown();
  doc.fontSize(12).text('SV.07.A – Overview of building progress.', {align: 'center'});
  doc.moveDown();

  doc.rect(doc.x, doc.y, 200, 100).stroke();
  doc.text('[Photo: SV.07.B]', doc.x + 60, doc.y + 40);
  doc.moveDown();
  doc.fontSize(12).text('SV.07.B – Overview of building Entrance', {align: 'center'});
  doc.moveDown();

  doc.end();

  stream.on('finish', () => {
    console.log('PDF generated successfully!');
  });
}

generatePDF();
