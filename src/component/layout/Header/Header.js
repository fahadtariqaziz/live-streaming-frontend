import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";
import { FaUserAlt } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  return (
    <ReactNavbar
      burgerIconSize="1.5vmax"
      burgerColorHover="#eb4034"
      logo={logo}
      logoWidth="3vmax"
      navColor1="grey"
      logoHoverSize="10px"
      logoHoverColor="#eb4034"
      link1Text="Home"
      link2Text="Live Stream"
      link3Text="Contact"
      link4Text="About"
      link1Url="/"
      link2Url="/live"
      link3Url="/contact"
      link4Url="/about"
      link1Size="1.3vmax"
      link1Color="rgba(35,35,35 , 0.8)"
      nav1justifyContent="flex-end"
      nav2justifyContent="flex-end"
      nav3justifyContent="flex-start"
      nav4justifyContent="flex-start"
      link1ColorHover="#eb4034"
      link1Margin="1vmax"
      searchIconUrl="/search"
      cartIconUrl="/cart"
      profileIconUrl="/login"
      searchIconSize="2vmax"
      profileIconColor="rgba(35,35,35,0.8)"
      searchIconColor="rgba(35,35,35,0.8)"
      cartIconColor="rgba(35,35,35,0.8)"
      profileIconColorHover="#eb4034"
      searchIconColorHover="#eb4034"
      cartIconColorHover="#eb4034"
      cartIconMargin="1vmax"
      profileIcon={true}
      ProfileIconElement={FaUserAlt}
      cart={CiShoppingCart}
      search={FaSearch}
    />
  );
};

export default Header;
