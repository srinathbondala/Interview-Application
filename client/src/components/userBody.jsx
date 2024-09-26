import { useEffect } from "react";
import UserContent from "./UserContent";
import UserForm from './UserForm';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
function UserBody(){
    const navigation = useNavigate();
    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            alert('authenticated id have expired. Please login again');
            navigation('/login');
        }
    });
    return (
        <div className="container">
            <div className="main-body">
            <UserContent islogged={true}/>
            </div>
            <div className="form-section">
            <UserForm />
            </div>
        </div>
    );
}
export default UserBody;