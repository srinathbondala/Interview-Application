import UserContent from "./UserContent";
import UserForm from './UserForm';
function UserBody(){
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