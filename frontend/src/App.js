import GeneratePdfButton from "./components/GeneratePdfButton";
import Header from "./components/Header";
import ReportForm from "./components/ReportForm";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";


function App() {
  const exampleFormData = [
    { label: "Site Name", value: "Main Construction Site" },
    { label: "Inspector", value: "Yawar Ashraf" },
    { label: "Date", value: "2025-07-17" }
  ];

  function Home() {
    return (
      <>
        <h1>Hello, world!</h1>
        <p>Welcome to the FieldLens project</p>
        <GeneratePdfButton formData={exampleFormData} />
        <ReportForm />
      </>
    );
  }

  function About() {
    return <h2>About Page</h2>;
  }

  function Contact() {
    return <h2>Contact Page</h2>;
  }

  return (
    <Router>
      <Header />
      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/about">About</Link> |{" "}
        <Link to="/contact">Contact</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;