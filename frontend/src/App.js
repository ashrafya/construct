import GeneratePdfButton from "./components/GeneratePdfButton";

function App() {
  const exampleFormData = [
    { label: "Site Name", value: "Main Construction Site" },
    { label: "Inspector", value: "Yawar Ashraf" },
    { label: "Date", value: "2025-07-17" }
  ];

  return (
    <div>
      <h1>Hello, world!</h1>
      <p>Welcome to the FieldLens project</p>
      <GeneratePdfButton formData={exampleFormData} />
    </div>
  );
}

export default App;