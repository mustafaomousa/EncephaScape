import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { AppContext } from '../../context/AppContextProvider';
import brain from './brain-cartoon.jpg'
import './profile.css'

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
        <div className='profile-page'>
            <div className='profile-body'>
                <h1>Profile</h1>
                <div>
                    <ul className="profile-card">
                        <img src={brain} alt='brain' />
                        <h3>{user.username}</h3>
                        <h3>{user.email}</h3>
                        <h3>{user.phoneNumber}</h3>
                        <div className='stack-amount'>
                            <h5 style={{ color: 'white' }}>Amount of stacks</h5>
                        </div>
                    </ul>

                </div>
            </div>
            <div className='profile-button-box'>
                <button onClick={logout}>Log Out</button>
                <button onClick={logout}>Delete Account</button>
                <button onClick={logout}>Edit Profile Information</button>
                <button onClick={logout}>Change Password</button>
            </div>
        </div>
    )
};

export default ProfilePage;