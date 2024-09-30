import { useEffect, useState } from "react";
import UserContent from "./UserContent";
import UserForm from './UserForm';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import UserSideBar from './UserSidebar';
import AppliedJobBody from './User/AppliedJobBody';

function UserBody() {
    const navigation = useNavigate();
    const [activeComponent, setActiveComponent] = useState('content'); // Default to UserContent

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            alert('Authenticated ID has expired. Please login again');
            navigation('/login');
        }
    }, [navigation]);

    const handleProfileClick = () => {
        setActiveComponent('profile');
    };

    const handleTopCompaniesClick = () => {
        setActiveComponent('companies');
    };

    const handleJobsClick = () => {
        setActiveComponent('jobs');
    };

    return (
        <div className="container">
            <UserSideBar 
                user={JSON.parse(localStorage.getItem('Details'))}
                onProfileClick={handleProfileClick}
                onTopCompaniesClick={handleTopCompaniesClick}
                onJobsClick={handleJobsClick}
            />
            <div className="main-body1">
                {activeComponent === 'content' && <UserContent islogged={true} />}
                {activeComponent === 'profile' && <UserForm />}
                {activeComponent === 'companies' && <UserContent />} 
                {activeComponent === 'jobs' && <AppliedJobBody />}
            </div>
        </div>
    );
}

export default UserBody;