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
import NotFound from './components/OtherPage/NotFound';
import Application from './components/Admin/Application';

function App() {
  const { token } = useToken();
  const [role, setRole] = useState(localStorage.getItem('userType') || null);

  useEffect(() => {
    const userType = localStorage.getItem('userType');
    if (token && userType) {
      setRole(userType);
    }
  }, [token]);
  
  return (
    <div className="app-container">
        <Navbar logincallback={setRole} role={role}/>
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
            {role === 'admin' && (<Route path="/admin/*">
              <Route path='' element={
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
              <Route path='user-applied/:id' element={<UserApplied />} />
              <Route path='application/:id' element={<Application />} />
              <Route path="*" element={<NotFound />} />
            </Route>)}
            {role === 'user' && (
              <Route path="/user/*">
                <Route path="" element={<UserBody />} />
                <Route path="all" element={<AllCompanies />} />
                <Route path="apply/:jobId" element={<JobApplyPage />} />
                <Route path="profile" element={<UserForm />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            )}
            <Route path="/login" element={<Login logincallback={setRole}/>} />
            <Route path="/signup" element={<Signup />} />
          <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
    </div>
  );
}

export default function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

// export default App;
