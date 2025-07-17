// Example: frontend/src/components/GeneratePdfButton.js

function GeneratePdfButton({ formData }) {
  const handleGeneratePdf = async () => {
    const apiPort = '5000';
    const apiEndpoint = '/api/create-pdf';
    const apiUrl = `http://localhost:${apiPort}${apiEndpoint}`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ formData }),
    });

    const contentType = response.headers.get('Content-Type') || '';
    if (!response.ok || !contentType.includes('application/pdf')) {
      alert('Failed to generate PDF. Please try again.');
      return;
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'fieldlens-report.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return <button onClick={handleGeneratePdf}>Generate PDF</button>;
}

export default GeneratePdfButton;