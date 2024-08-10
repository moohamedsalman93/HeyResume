
import { LoadingProvider, useLoading } from './utils/LoadingContext'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import LoadingSpinner from './utils/LoadingSpinner';
import ResumePage from './pages/resume-page/ResumePage';
// import EmployeePage from './pages/User/EmployeePage';





function App() {

  const { showLoading, hideLoading, isLoading } = useLoading();



  return (

    <div className="w-full h-screen bg-[#f9fbfe] font-mono ">
      {isLoading && <LoadingSpinner />}
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
