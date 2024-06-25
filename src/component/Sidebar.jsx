import React from 'react'
import styled from 'styled-components';
import {HomeRounded, CloseRounded, SearchRounded, FavoriteRounded, UploadRounded, LightModeRounded, LogoutRounded, DarkModeRounded, CloudUploadRounded, LiveTv, LogoDevRounded, LoginRounded, LoginOutlined } from "@mui/icons-material";
import LogoImage from "../images/logo.png";
import {Link, Navigate} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout } from '../actions/userAction';
import { useAlert } from 'react-alert';

const MenuContainer = styled.div`
    flex: 0.4;
    flex-direction: column;
    height: 100vh;
    display: flex;
    background-color: ${({theme}) => theme.bg};
    color:  ${({theme}) => theme.text_primary};
    margin-top: 0px;
    padding : 30px;
    padding-top: 40px;
    @media (max-width : 1100px) {
        position: fixed;
        z-index : 1000;
        width: 100%;
        max-width: 250px;
        left: ${({ menuOpen }) => ( menuOpen ? "0" : "-100%" )};
        transition : 0.3s ease-in-out;
    }
`;

const Logo = styled.div`
    width: 100%;
    color : ${({theme}) => theme.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    font-weight: bold;
    font-size:20px;
    padding-right: 50px
    margin: 20px 0px;
`;

const Image = styled.img`
    height : 40px;
`;


const Close = styled.div`
    display:none;
    @media (max-width: 1100px){
        display: block;
    }
`;

const Flex = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0px 12px;
`;


const Elements = styled.div`
    padding: 4px 16px;
    display: flex;
    flex-direction : row;
    justify-content: flex-start;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    color: ${({theme}) => theme.text_secondary};
    width: 100%;
    text-decoration: none !important;
    &:hover {
        background-color : purple;
    }
`;

const NavText = styled.div`
    padding: 12px 0px;
    text-decoration: none !important;


`;

const HR = styled.div`
    width : 100%;
    height: 1px;
    background-color: ${( {theme}) => theme.text_secondary + 50};
    margin: 10px 0px;
    
`;



const Sidebar = ({ menuOpen, setMenuOpen, setDarkMode, darkMode }) => {

    const dispatch = useDispatch();
    const alert = useAlert();

    function logoutUser(){
        dispatch(logout());        //error: logout is not defined  import karen ge oper
        alert.success("Logout Successfully");
      }

    function navigateToLogin() {
        Navigate('/login');
    };  

    const menuItems = [
        
        
        {
            Link: "/home",
            name: "Home",
            icon: <HomeRounded />,
        },
        {
            Link: "/live",
            name: "Live Channels",
            icon: <LiveTv />,
        },
    
        
    
        {
            Link: "/live",
            name: "Trending",
            icon: <FavoriteRounded />,
        },
        {
            Link : "/",
            name: "LogIn",
            icon: <LoginOutlined />,
        },
    ];
    
    const button = [
    
        /*{
            fun: ()=>console.log("Upload"),
            name : "Upload",
            icon: <CloudUploadRounded />,
        },*/
    
        {
            fun: ()=> setDarkMode(!darkMode),
            name :  darkMode? "Light Mode" : "Dark Mode",
            icon: darkMode ? <LightModeRounded /> : <DarkModeRounded/>,
        },

        
    
        {
            fun: logoutUser,
            name : "Log Out",
            icon: <LogoutRounded />,
        },
    ]


  return (

    <MenuContainer menuOpen={ menuOpen }>
         <p style={{ fontSize: '25px', fontWeight: '700', paddingBottom: '30px' }}>
        <img src="" alt="" style={{ height: '30px', marginRight: '10px' }} />
        Easy Stream
    </p>
        
        {
            menuItems.map( (item) => (
                <Link to={item.Link} style={ {textDecoration: "none"} }>
            <Elements>
                {item.icon}
                <NavText>{item.name}</NavText>
            </Elements>
            </Link>
            ))
        }  

 

        <HR></HR>

        {
            button.map( (item) => (
                
            <Elements onClick={item.fun}>
                {item.icon}
                <NavText>{item.name}</NavText>
            </Elements>
            
            ))
        } 
        
    </MenuContainer>
    
  )
}

export default Sidebar