import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { AppContext } from '../../context/AppContextProvider';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { user } = useContext(AppContext);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push('/');
    };

    return (
        <>
            <h1>Profile</h1>
            <ul className="profile-dropdown">
                <li>Username: {user.username}</li>
                <li>Email: {user.email}</li>
                <li>Phone Number: {user.phoneNumber}</li>
            </ul>
            <div className='profile-button-box'>
                <button onClick={logout}>Log Out</button>
                <button onClick={logout}>Delete Account</button>
                <button onClick={logout}>Edit Profile Information</button>
                <button onClick={logout}>Change Password</button>
            </div>
        </>
    )
};

export default ProfilePage;