import React, { useState, useCallback } from 'react';
import './GeneratePdfButton.css';

const API_PORT = 5000;
const API_ENDPOINT = '/api/create-pdf';
const API_URL = `http://localhost:${API_PORT}${API_ENDPOINT}`;

/**
 * GeneratePdfButton is a React component that renders a button to generate and download a PDF file
 * based on the provided form data. When clicked, it sends a POST request to the API endpoint with
 * the form data, receives a PDF blob in response, and triggers a download in the browser.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.formData - The data to be sent to the API for PDF generation.
 * @param {Object} props.images - The images to be included in the PDF.
 *
 * @example
 * <GeneratePdfButton formData={myFormData} images={myImages} />
 *
 * // Internal State:
 * // - loading: Indicates whether the PDF generation is in progress.
 *
 * // Main Logic:
 * // - handleGeneratePdf: Handles the click event, sends the request, processes the response,
 * //   and manages the download and loading state.
 */
function GeneratePdfButton({ formData, images }) {
  const [loading, setLoading] = useState(false);
  // images can be an array of dictionaries (objects), e.g. [{ src: "...", alt: "..." }, ...]
  // This will work as long as your backend expects and can handle this format.

  const handleGeneratePdf = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData, images }), // images can be an array of objects
      });

      const contentType = response.headers.get('Content-Type') || '';
      if (!response.ok || !contentType.includes('application/pdf')) {
        throw new Error('Failed to generate PDF.');
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
    } catch (error) {
      alert(error.message || 'An error occurred while generating the PDF.');
    } finally {
      setLoading(false);
    }
  }, [formData, images]); // include images in dependency array

  return (
    <button className="generate-pdf-button" onClick={handleGeneratePdf} disabled={loading}>
      {loading ? 'Generating...' : 'Generate PDF'}
    </button>
  );
}

export default GeneratePdfButton;