import './App.css';
import Navbar from './components/Navbar';
import MainBody from './components/AdminContent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Form from './components/AdminForm';
import Login from './components/Login';
import Signup from './components/Signup';
import UserContent from './components/UserContent';
import MainPage from './components/MainPage';
import Footer from './components/Footer';
import UserBody from './components/userBody';
import JobApplyPage from './components/userApplicationPage/JobApplyPage';
import AllCompanies from './components/AllCompanies';
import UserApplied from './components/userApplied';
import { useState, useEffect } from 'react';
import useToken from './useToken';
import UserForm from './components/UserForm';

function App() {
  const { token } = useToken();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const userDetails = localStorage.getItem('userType');
    if (userDetails) {
      setRole(userDetails);
    }
  }, [token]);

  return (
    <div className="app-container">
      <BrowserRouter>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={
              <>
                <MainPage />
                <div className="main-body">
                  <UserContent islogged={false} />
                </div>
              </>
            } />
            <Route path="/admin" element={
              <>
                <div className="container">
                  <div className="main-body">
                    <MainBody />
                  </div>
                  <div className="form-section">
                    <Form />
                  </div>
                </div>
              </>
            } />
            <Route path='/user' element={<UserBody />}/>
            {role==='user' && token &&<Route path="/userApplied" element={<UserApplied />}/>}
            {role==='user' && token &&<Route path="/all" element={<AllCompanies/>}/> }
            {role==='user' && token &&<Route path="/apply/:jobId" element={<JobApplyPage />} />}
            {role==='user' && token &&<Route path="/user/profile" element={<UserForm />} />}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
