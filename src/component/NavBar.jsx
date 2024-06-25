import React from 'react';
import styled from 'styled-components';
import { Menu, PersonRounded } from "@mui/icons-material";
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // Import useDispatch and useSelector from react-redux
import { logout } from '../actions/userAction'; // Import the logout action creator from your actions file
import { useAlert } from 'react-alert';

const NavBarDiv = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px; /* Increase padding for small screens */
    margin: 20px;
    align-items: center;
    color: ${({ theme }) => theme.text_primary};
    background: ${({ theme }) => theme.bgLight};
    -webkit-backdrop-filter: blur(5.7px);

    @media (max-width: 768px) {
        flex-direction: column; /* Change to column layout on small screens */
        padding: 16px;
        gap: 10px;
    }
`;

const ButtonDiv = styled.div`
    font-size: 14px;
    cursor: pointer;
    max-width: 190px;
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.primary};
    border: 1px solid ${({ theme }) => theme.primary};
    border-radius: 12px;
    padding: 8px 10px;
    gap: 20px;
`;

const IcoButton = styled(IconButton)`
    ${({ theme }) => theme.text_secondary} !important;
    padding-right: 50px;
    color: grey;
    transition: color 0.3s ease; /* Adding a transition for smooth hover effect */
    
    &:hover {
        color: white;
    }

    @media (max-width: 768px) {
        padding-right: 0; /* Remove padding-right on small screens */
    }
`;

const NavBar = ({ setMenuOpen, menuOpen }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Get the dispatch function from react-redux
    const alert = useAlert();
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    const handleLoginClick = () => {
        if (isAuthenticated) {
            logoutUser(); // Call the logoutUser function if authenticated
        } else {
            navigate('/');
        }
    };

    const logoutUser = () => {
        dispatch(logout()); // Dispatch the logout action
        alert.success("Logout Successfully");
    };

    return (
        <NavBarDiv>
            <IcoButton onClick={() => setMenuOpen(!menuOpen)}>
                <Menu />
            </IcoButton>
        </NavBarDiv>
    );
};

export default NavBar;
