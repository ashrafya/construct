// server/api/pdf.js
const express = require('express');
const PDFDocument = require('pdfkit');
const getStream = require('get-stream');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { formData } = req.body; // your field lens JSON shape

    // Validate formData
    if (!Array.isArray(formData)) {
      res.status(400).set('Content-Type', 'application/json').json({ error: 'Invalid formData' });
      return;
    }

    const doc = new PDFDocument();
    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfBuffer = Buffer.concat(buffers);
      res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="fieldlens-report.pdf"',
      });
      res.end(pdfBuffer);
    });

    doc.fontSize(20).text('FieldLens PDF Report', { align: 'center' });
    doc.moveDown();

    // Loop through your form data
    formData.forEach(item => {
      doc.fontSize(14).text(`${item.label}: ${item.value}`);
      doc.moveDown(0.5);
    });

    doc.end();
  } catch (err) {
    res.status(500).set('Content-Type', 'application/json').json({ error: 'Failed to generate PDF' });
  }
});

module.exports = router;
