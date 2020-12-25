import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push('/');
    };

    return (
        <ul className="profile-dropdown">
            <li>Username here</li>
            <li>Password here</li>
            <li>
                <button onClick={logout}>Log Out</button>
            </li>
        </ul>
    )
};

export default ProfilePage;