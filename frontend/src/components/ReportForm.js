import './ReportForm.css';
import GeneratePdfButton from './GeneratePdfButton';
import { useState, useCallback } from 'react';


const InputField = ({
  label,
  id,
  name,
  type = "text",
  placeholder,
  isTextArea = false,
  onChange,
  value
}) => (
  <div className={"reportform-field reportform-field-" + id}>
    <label htmlFor={id} className="reportform-label">{label}</label>
    {isTextArea ? (
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        className="reportform-input"
        onChange={onChange}
        value={value ?? ""}
      />
    ) : (
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className="reportform-input"
        onChange={onChange}
        value={value ?? ""}
      />
    )}
  </div>
);



const ReportForm = () => {
  const exampleFormData = [
    { label: "Site Name", value: "Main Construction Site" },
    { label: "Inspector", value: "Yawar Ashraf" },
    { label: "Date", value: "2025-07-17" },
    { label: "Weather Conditions", value: "Sunny" },
    { label: "Site Conditions", value: "Dry and stable" },
    { label: "Safety Issues", value: "None reported" },
    { label: "Comments", value: "All systems operational" },
    { label: "Next Steps", value: "Continue monitoring" },
    { label: "Attachments", value: "None" }
  ];

  const [formData, setFormData] = useState({
    // Initialize all fields to prevent undefined values
    projectName: '',
    reportId: '',
    reviewerName: '',
    ffsProjectNumber: '',
    authorName: '',
    clientName: '',
    present: '',
    weather: '',
    date: '',
    primaryContactName: '',
    primaryContactEmail: '',
    primaryContactPhone: '',
    secondaryContactName: '',
    secondaryContactEmail: '',
    secondaryContactPhone: ''
  });

  // Memoized handler to prevent re-creation on every render
  const handleInputChange = useCallback((e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      // Convert to number if input type is number
      [name]: type === "number" ? Number(value) : value
    }));
    console.log("formData:", formData);
  }, []);


  return (
    <div className="reportform-root">
      <form className="reportform-form">
        <h2 className="reportform-title">Generate Report</h2>
        <InputField label="Project Name" id="projectName" name="projectName" placeholder="Project Name" onChange={handleInputChange} value={formData.projectName}/>
        <InputField label="Report ID" id="reportId" name="reportId" type="number" placeholder="Report ID" onChange={handleInputChange} value={formData.reportId}/>
        <InputField label="Reviewer Full Name" id="reviewerName" name="reviewerName" placeholder="Reviewer Full Name" onChange={handleInputChange} value={formData.reviewerName}/>
        <InputField label="FFS Project Number" id="ffsProjectNumber" name="ffsProjectNumber" type="number" placeholder="FFS Project Number" onChange={handleInputChange} value={formData.ffsProjectNumber}/>
        <InputField label="Author Full Name" id="authorName" name="authorName" placeholder="Author Full Name" onChange={handleInputChange} value={formData.authorName}/>
        <InputField label="Client Name" id="clientName" name="clientName" placeholder="Client Name" onChange={handleInputChange} value={formData.clientName}/>
        <InputField label="People Present at Site Visit" id="present" name="present" placeholder="Enter names of people present, comma separated" onChange={handleInputChange} value={formData.present}/>
        <InputField label="Weather" id="weather" name="weather" type="number" placeholder="Enter temperature (°C)" onChange={handleInputChange} value={formData.weather}/>
        {/* <InputField label="Disclaimer" id="disclaimer" name="disclaimer" placeholder="Enter disclaimer text" />   This will stay the same for now */}
        <InputField label="Date" id="date" name="date" type="date" placeholder="Date of site visit" onChange={handleInputChange} value={formData.date}/>

        <InputField label="Primary Contact Name" id="primaryContactName" name="primaryContactName" placeholder="Primary Contact Name" onChange={handleInputChange} value={formData.primaryContactName}/>
        <InputField label="Primary Contact Email" id="primaryContactEmail" name="primaryContactEmail" type="email" placeholder="Primary Contact Email" onChange={handleInputChange} value={formData.primaryContactEmail}/>
        <InputField label="Primary Contact Phone" id="primaryContactPhone" name="primaryContactPhone" type="tel" placeholder="Primary Contact Phone" onChange={handleInputChange} value={formData.primaryContactPhone}/>
        <InputField label="Secondary Contact Name" id="secondaryContactName" name="secondaryContactName" placeholder="Secondary Contact Name" onChange={handleInputChange} value={formData.secondaryContactName}/>
        <InputField label="Secondary Contact Email" id="secondaryContactEmail" name="secondaryContactEmail" type="email" placeholder="Secondary Contact Email" onChange={handleInputChange} value={formData.secondaryContactEmail}/>
        <InputField label="Secondary Contact Phone" id="secondaryContactPhone" name="secondaryContactPhone" type="tel" placeholder="Secondary Contact Phone" onChange={handleInputChange} value={formData.secondaryContactPhone}/>

        <div className="reportform-field reportform-field-photos">
          <label htmlFor="photos" className="reportform-label">Photos</label>
          <input
            type="file"
            id="photos"
            name="photos"
            className="reportform-input"
            multiple
            accept="image/*"
            onChange={handleInputChange}
          />
        </div>

        <GeneratePdfButton formData={formData} />
      </form>
      <div>{JSON.stringify(exampleFormData)}</div>
    </div>
  );
}

export default ReportForm;
