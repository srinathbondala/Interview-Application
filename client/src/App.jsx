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

function App() {
  return (
    <BrowserRouter>
      <Navbar />
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
        <Route path='/user' element={
          <>
              <UserBody />
          </>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/apply/:jobId" element={<JobApplyPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
