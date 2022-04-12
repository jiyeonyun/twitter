import React from 'react';
import { authService } from '../myBase';
import { Navigate, useNavigate } from 'react-router-dom';

const Profile = (props) => {
    const navigate = useNavigate();
    const onLogOutClick = ()=>{
        authService.signOut();
        navigate('/');
    }
            return(
                <>
                    <button onClick={onLogOutClick}>Log Out</button>
                </>
            );
        };

export default Profile;