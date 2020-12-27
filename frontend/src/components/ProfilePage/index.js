import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { AppContext } from '../../context/AppContextProvider';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const { user } = useContext(AppContext);
    const sessionUser = useSelector((state) => state.session.user);

    if (sessionUser === undefined) {
        alert('Please login or sign-up');
        return <Redirect to='/signup'></Redirect>
    };

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