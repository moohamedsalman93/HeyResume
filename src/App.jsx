

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import ResumePage from './pages/resume-page/ResumePage';

function App() {


  return (

    <div className="w-full h-screen bg-[#f9fbfe] font-mono ">
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resume" element={<ResumePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
