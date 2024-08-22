

import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import ResumePage from './pages/resume-page/ResumePage';
import { useEffect, useState } from "react";
import getTemplateData from "./lib/getTemplateData";
import latex from "./lib/latext";
import './App.css'


function App() {
  const [isStarted, setIsStarted] = useState(false);
  const exampleData = { "selectedTemplate": 1, "basics": { "name": "mohamed salman22", "email": "moohamedsalman93@gmail.com", "phone": "9843594178", "address": "28/5, junnath miyan street, parangipettai-608502", "website": "moohamedsalman93.github.com/portfolio", "summary": "Experienced software developer with a strong background in building scalable web applications. hgshdfhgshgafhgahsdgfjgasd idhasjfh dasjihfjhasji uiashdfjih dsifhjihsadji sdahfjiadshfi dsaifhjiadhsfji jisadhfiadhsf asdifhuisahdf sdiufhsauihdfi sadifhsduiahf sadijfiojogd ighidihiet8usdf ge9itgi9tjefdnh8g rutiejdgkdi9u " }, "education": [{ "institution": "University of Example", "location": "Example City", "studyType": "Bachelor's", "area": "Computer Science", "score": "3.8", "startDate": "Jul-2015", "endDate": "Sep-2019" }, { "institution": "salman", "studyType": "bac", "area": "asd", "score": "asd", "startDate": "Jan-2014", "endDate": "Jan-2014" }], "work": [{ "name": "Example Corp", "position": "Software Engineer", "location": "Example City", "startDate": "2019", "endDate": "Present", "highlights": ["Developed web applications", "Led a team of 5 engineers"] }], "skills": [{ "name": "Programming Languages", "keywords": ["JavaScript", "Python", "Java"] }, { "name": "Frameworks", "keywords": ["React", "Node.js", "Django"] }], "projects": [{ "name": "Project Alpha", "description": "A web application for managing tasks.", "keywords": ["React", "Node.js"], "url": "https://github.com/johndoe/project-alpha" }], "awards": [{ "title": "Best Developer Award", "summary": "Awarded for outstanding performance in software development.", "date": "2020", "awarder": "Example Corp" }], "headings": { "education": "Education", "work": "Experience", "skills": "Skills", "projects": "Projects", "awards": "Awards" }, "sections": ["profile", "education", "work", "skills", "projects", "awards"] }

  // useEffect(() => {

  //   const generatePDF = async () => {
  //     const { texDoc, opts } = getTemplateData(exampleData);
  //     const pdfUrl = await latex(texDoc, opts);
  //     setIsStarted(true)
  //   };

  //   if (!isStarted) {
  //     generatePDF()
  //   }

  // }, [])






  return (

    <div className="w-full h-screen bg-[#f9fbfe] font-mono ">

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/resume" element={<ResumePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
