import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import easyStream from "../../images/easyStream.PNG";
import image1 from "../../images/image1.PNG";
import preview from "../../images/Preview.png";
import ready from "../../images/ready.avif";
import vector from "../../images/vector.jpg";
import UserOptions from "../layout/Header/UserOptions";

const Home = () => {
  return (
    <div
      style={{
        position: "relative",
        backgroundImage: `url(${vector})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "1000px",
        color: "white",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1,
        }}
      ></div>

      <div className="content" style={{ position: "relative", zIndex: 2 }}>
        <div className="navbar">
          <p></p>
          <ul
            style={{
  
              marginTop: "-410px",
              paddingRight: "150px",
              paddingBottom: "-150px",
              
            }}
          >
            <li>
              <a href="/live">Live</a>
            </li>
            <li>
              <a href="/live">Trending</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Support</a>
            </li>
            <li>
              <a href="/">LOGIN</a>
            </li>
          </ul>
        </div>
        <h1 className="heading">
          EXPLORE <br /> LIVE STREAMING
        </h1>
        <div>
          <Link to="/live">
            <button className="buttonLive" type="button">
              LIVE STREAMING
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
