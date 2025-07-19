import ReportForm from "../components/ReportForm";
import "./CreatePdfReport.css";


const CreatePdfReport = () => {



  return ( 
    <div className="create-pdf-report-form" style={{
      minWidth: "600px",
      maxWidth: "1800px",
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: "0%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      flexWrap: "wrap"
    }}>
      <h1>Generate report</h1>
      <p>Please fill out the form below to create a report</p>
      <ReportForm />
    </div>
  );
}

export default CreatePdfReport

