import './App.css';
import {BrowserRouter as Router , Routes ,Route, BrowserRouter} from "react-router-dom";
import WebFont from 'webfontloader';
import React from 'react';
import Home from "./component/Home/Home.js"
import Search from "./component/Product/Search.js"
import LoginSignup from './component/User/LoginSignup.js';
import store from './store.js';      //after login load user karne ke liye load set
import { loadUser } from './actions/userAction.js';
import UserOptions from './component/layout/Header/UserOptions.js';     //ye banaye ge logout wagera show karane ke liye
import { useSelector ,useDispatch } from 'react-redux';
import Profile from "./component/User/Profile.js"
import Protected from './component/Route/ProtectedRoute.js';
import UpdateProfile from "./component/User/UpdateProfile.js";  //userAction men small u tha updateProfile same hoga tou kaam ni kare ga
import UpdatePassword from "./component/User/UpdatePassword.js";  //userAction men small u tha updateProfile same hoga tou kaam ni kare ga
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import axios from "axios";
import { useEffect , useState } from 'react';
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./utils/Themes";
import Sidebar from "./component/Sidebar.jsx";
import NavBar from "./component/NavBar.jsx";
import LiveChannels from "./pages/LiveChannels.jsx";
import Favourite from "./pages/Favourite.jsx";
import Feedback from './component/Feedback.js';
import Dashboard from './component/Dashboard.js';
import PSL from "./StreamingChannels/PSL.js";
import IPL from "./StreamingChannels/IPL.js"
import About from './component/About.js';
import "./App.module.css";
//import Home1 from './component/Home1.js';

function App() {

  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  const [stripeApiKey , setStripeApiKey] = useState("");


  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(true);
  
  useEffect(() => {
    async function getStripeApiKey() {
      try {
        const response = await axios.get('/api/v1/stripeapikey');
        setStripeApiKey(response.data.stripeApiKey);                        //aese get ki hum ne backend se stripe api key
      } catch (error) {
        console.error('Error fetching Stripe API key:', error);
       }
    }

    getStripeApiKey();
  }, []);

  


  
  React.useEffect( () => {           //page load hone se pehle he load karle ge font useEffect se

    WebFont.load( {     
      google: { families : ["Roboto" , "Droid Sans" , "Chilanka"],
     },
    });

    store.dispatch(loadUser());

    //getStripeApikey();          //yaha call karen ge sath package install kare ge
  //}, [dispatch]);
}, []);







const Container = styled.div`
  display: flex;
  background: ${({ theme }) => theme.bgLight};
  width: 100%;
  height: 100vh;
  overflow-x: hidden;  // Hide horizontal overflow
  overflow-y: auto;    // Enable vertical scrolling

  // Optional: Add responsive styles or additional styling
  @media (max-width: 768px) {
    background: ${({ theme }) => theme.bgDark}; // Example of a change for smaller screens
  }
`;

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
`;



  return (

    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <BrowserRouter>
        <Container>
        
          {menuOpen && (
            <Sidebar
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
              setDarkMode={setDarkMode}
              darkMode={darkMode}
            />
          )}
          <Frame>
          
            <NavBar setMenuOpen={setMenuOpen} menuOpen={menuOpen} />
            
            {isAuthenticated && <UserOptions user={user} />}
            <Routes>
              <Route exact path='/home' element={<Home/>} />
              <Route path="/live" exact element={<LiveChannels />} />
              <Route path="/trending" exact element={<Favourite />} />
              <Route path="/PSL/live" exact element={ isAuthenticated? <PSL /> : <LoginSignup /> } />
              <Route path="/IPL/live" exact element={isAuthenticated? <IPL /> : <LoginSignup />} />
              <Route exact path='/dashboard' element={<Dashboard/>} />
              
              <Route exact path='/search' element={<Search/>} />
              <Route exact path='/' element={<LoginSignup/>} />
              <Route exact path='/account' element = { <Protected isAuth={isAuthenticated}><Profile/></Protected>} />
              <Route exact path='/me/update' element = { <Protected isAuth={isAuthenticated}><UpdateProfile/></Protected>} />    
              <Route 
               exact
                path='/password/update'
                element = { <Protected isAuth={isAuthenticated} > <UpdatePassword/> </Protected>}
      
                />
              <Route exact path="/password/forgot" element={  <ForgotPassword/>} />
      
              <Route exact path="/password/reset/:token" element={<ResetPassword />} />
              <Route exact path="/contact" element={<Feedback />} />
              <Route exact path="/about" element={<About />} />
              
            </Routes>
            
          </Frame>
          
        </Container>
        
      </BrowserRouter>
    </ThemeProvider>
    
  
  );


}

export default App;


































