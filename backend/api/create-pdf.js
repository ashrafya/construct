const express = require('express');
const PDFDocument = require('pdfkit');

const router = express.Router();

/**
 * Generates a PDF buffer from the provided form data.
 *
 * @param {Array<{label: string, value: string}>} formData - 
 *   An array of objects representing form fields, each with a `label` and `value`.
 * @returns {Promise<Buffer>} 
 *   A promise that resolves to a Buffer containing the generated PDF data.
 *
 * @example
 * const formData = [
 *   { label: 'Name', value: 'John Doe' },
 *   { label: 'Email', value: 'john@example.com' }
 * ];
 * generatePdfBuffer(formData).then(buffer => {
 *   // Do something with the PDF buffer
 * });
 */

function generatePdfBuffer(formData) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const buffers = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => resolve(Buffer.concat(buffers)));
    doc.on('error', reject);

    doc.fontSize(20).text('FieldLens PDF Report', { align: 'center' });
    doc.moveDown();

    formData.forEach(item => {
      doc.fontSize(14).text(`${item.label}: ${item.value}`);
      doc.moveDown(0.5);
    });

    doc.end();
  });
}

router.post('/', async (req, res) => {
  const { formData } = req.body;

  if (!Array.isArray(formData)) {
    return res.status(400).json({ error: 'Invalid formData' });
  }

  try {
    const pdfBuffer = await generatePdfBuffer(formData);
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
