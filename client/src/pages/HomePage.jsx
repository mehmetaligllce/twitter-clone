import React from "react";
import axios from "axios";
import Navbar from '../components/Navbar.jsx';
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import TweetList from "../components/TweetList.jsx";
const HomePage=()=>{
    return(
        <div>
            <Navbar />
            <TweetList />

            <Footer />
        </div>
    )
}

export default HomePage;