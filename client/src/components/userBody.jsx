import { useEffect, useState } from "react";
import UserContent from "./UserContent";
import UserForm from './UserForm';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import UserSideBar from "./UserSideBar";

function UserBody() {
    const navigation = useNavigate();
    const [activeComponent, setActiveComponent] = useState('content'); // Default to UserContent

    useEffect(() => {
        const token = Cookies.get('token');
        console.log("This is the User Data", token);
        if (!token) {
            alert('Authenticated ID has expired. Please login again');
            navigation('/login');
        }
        console.log('user');
    }, [navigation]);

    const handleProfileClick = () => {
        setActiveComponent('profile');
    };

    const handleTopCompaniesClick = () => {
        setActiveComponent('companies');
    };

    return (
        <div className="container">
            <UserSideBar 
                user={JSON.parse(localStorage.getItem('Details'))}
                onProfileClick={handleProfileClick}
                onTopCompaniesClick={handleTopCompaniesClick}
            />
            <div className="main-body">
                {activeComponent === 'content' && <UserContent islogged={true} />}
                {activeComponent === 'profile' && <UserForm />}
                {activeComponent === 'companies' && <UserContent />} 
            </div>
        </div>
    );
}

export default UserBody;