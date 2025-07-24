function generateInformationPageReport(formData = {}, images = []) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Site Visit Report</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 40px;
        background: white;
        color: #000;
      }

      .field-lens-logo{
        justify-content: left;
        max-width: 25px;
        max-height: 25px;
        border-radius: 50%;
      }
      .report-container {
        max-width: 800px;
        margin: auto;
      }

      .header {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 30px;
        font-weight: bold;
        padding: 20px 0;;
      }

      .header-left {
        text-align: left;
        flex: 1;
      }
      .header-right {
        text-align: right;
        flex: 1;
      }
      .header-center {
        font-size: 1.5rem;
        text-align: center;
        flex: 2;
      }

      .info-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        font-size: 0.95rem;
      }

      .divider {
        margin: 25px 0;
        border: none;
        height: 2px;
        background: #003B5C;
      }

      .details {
        font-size: 0.95rem;
      }

      .details p {
        margin: 10px 0;
      }

      .disclaimer {
        margin-top: 10px;
      }

      .date-section {
        margin: 20px 0;
        font-size: 0.95rem;
      }

      .contacts {
        display: flex;
        justify-content: space-between;
        gap: 40px;
        margin-bottom: 30px;
        font-size: 0.95rem;
      }

      .contact {
        flex: 1;
      }

      .photos {
        font-size: 0.95rem;
      }

      .photo-row {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
      }

      .photo {
        width: 48%;
        text-align: center;
      }

      .photo-img {
        width: 100%;
        height: 180px;
        margin-bottom: 5px;
      }

    </style>
  </head>
  <body>
    <div class="report-container">
    <header class="header" style="display: flex; align-items: center; justify-content: center; gap: 40px; padding: 20px 0;">
      <div class="header-left">${formData.projectName || ''}</div>
      <div class="header-center">Site Visit Report</div>
      <div class="header-right">
      <img src="../../assets/field-lens-logo.png" alt="Field Lens Logo" class="field-lens-logo"/>
      </div>
    </header>

    <div class="info-grid">
      <div><strong>Project Name</strong><br>${formData.projectName || ''}</div>
      <div><strong>FFS Project Number</strong><br>${formData.ffsProjectNumber || ''}</div>
      <div><strong>Report ID</strong><br>${formData.reportId || ''}</div>
      <div><strong>Author</strong><br>${formData.authorName || ''}</div>
      <div><strong>Reviewer</strong><br>${formData.reviewerName || ''}</div>
      <div><strong>Client Name</strong><br>${formData.clientName || ''}</div>
    </div>

    <hr class="divider" />

    <div class="details">
      <p><strong>Present</strong><br>${formData.present || ''}</p>
      <p><strong>Temperature (°C)</strong><br>${formData.temperature || ''}</p>
      <p class="disclaimer"><strong>Disclaimer</strong><br>
      Site visits and field observations are conducted on a sampling basis, covering portions of completed and in-progress work observed at the time of each visit.
      These observations are not exhaustive and do not absolve the Contractor or subcontractors from their responsibilities for quality control, compliance with the
      construction documents, and adherence to all applicable codes and standards.
      </p>
    </div>

    <div class="date-section">
      <strong>Print Date</strong><br>${formData.date || ''}
    </div>

    <div class="contacts">
      <div class="contact">
      <strong>Primary Contact</strong><br>
      <p><strong>Name</strong><br>${formData.primaryContactName || ''}</p>
      <p><strong>Email</strong><br>${formData.primaryContactEmail || ''}</p>
      <p><strong>Phone</strong><br>${formData.primaryContactPhone || ''}</p>
      </div>
      <div class="contact">
      <strong>Secondary Contact</strong><br>
      <p><strong>Name</strong><br>${formData.secondaryContactName || ''}</p>
      <p><strong>Email</strong><br>${formData.secondaryContactEmail || ''}</p>
      <p><strong>Phone</strong><br>${formData.secondaryContactPhone || ''}</p>
      </div>
    </div>

    <hr class="divider" />

    <div class="photos">
      <strong>Photos</strong>
      <div class="photo-row">
      <div class="photo">
        <img src="${images[0].url || '../../assets/placeholder-image.png'}" alt="${'placeholder image'}" class="photo-img" />
        <p>${`SV.${formData.reportId}.A – Picture Description`}</p>
      </div>
      <div class="photo">
        <img src="${images[1].url || '../../assets/placeholder-image.png'}" alt="${'placeholder image'}" class="photo-img" />
        <p>${`SV.${formData.reportId}.B – Picture Description`}</p>
      </div>
      </div>
    </div>
    </div>
  </body>
  </html>`;
}


module.exports = generateInformationPageReport;
