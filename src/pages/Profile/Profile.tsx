import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isAuthenticated, user)
  }, [isAuthenticated, navigate, user]);

  if (!isAuthenticated) {
    return <div>Loading...</div>; // Puedes mostrar un estado de carga mientras se redirige
  }

  return (
    <div className="profile-container">
      <h1>{user?.name}'s Profile</h1>
      <img src={user?.profile_pic_url} alt="Profile" />
      <div>
        <p>Username: {user?.username}</p>
        <p>Email: {user?.email}</p>
      </div>
    </div>
  );
};

export default Profile;
