import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { AppContext } from "../../context/AppContextProvider";
import brain from "./brain-cartoon.jpg";
import "./profile.css";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [showDelete, setShowDelete] = useState(true);
  const [showLogout, setShowLogout] = useState(true);

  const sessionUser = useSelector((state) => state.session.user);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/");
  };

  const restore = (e) => {
    setShowDelete(true);
    setShowLogout(true);
  };

  const deleteTheAccount = (e) => {
    logout(e);
    dispatch(sessionActions.confirmedDeleteAccount(sessionUser.id));
  };

  if (sessionUser === undefined) {
    alert("Please login or sign-up");
    return <Redirect to="/signup"></Redirect>;
  }

  return (
    <div className="profile-page">
      <div className="profile-body">
        <h1>Profile</h1>
        <div>
          <ul className="profile-card">
            <img src={brain} alt="brain" />
            <h3>{sessionUser.username}</h3>
            <h3>{sessionUser.email}</h3>
            <h3>{sessionUser.phoneNumber}</h3>
            <div className="stack-amount">
              <h5 style={{ color: "white" }}>Amount of stacks</h5>
            </div>
          </ul>
        </div>
      </div>
      <div className="profile-button-box">
        <button onClick={() => setShowLogout(false)}>Log Out</button>
        <button onClick={() => setShowDelete(false)}>Delete Account</button>

        <button onClick={logout}>Edit Profile Information</button>
        <button onClick={logout}>Change Password</button>
      </div>
      <div className="delete-account">
        <div className={showDelete ? "hidden" : "delete-account-buttons"}>
          <div>
            <p>Are you sure you want to delete your account?</p>
          </div>
          <button onClick={(e) => deleteTheAccount(e)}>Yes</button>
          <button onClick={restore}>No</button>
        </div>
      </div>
      <div className="logout-account">
        <div className={showLogout ? "hidden" : "delete-account-buttons"}>
          <div>
            <p>Are you sure you want to logout?</p>
          </div>
          <button onClick={logout}>Yes</button>
          <button onClick={restore}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
