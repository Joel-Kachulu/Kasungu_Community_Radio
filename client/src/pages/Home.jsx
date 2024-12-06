// Home.js
import React from 'react'; 
import Navigation from '../components/Navigation';
import Slider from '../components/Slider';
import LatestNews from '../components/LatestNews';
import Categories from '../components/Categories';
import EditorsPicks from '../components/EditorsPicks';
import PopularPosts from '../components/PopularPosts';
import Footer from '../components/Footer';
import Weather from '../components/Weather';
import '../static/home.css'; 

const Home = () => {
    return (
        <div>z
            <Navigation />
            <div className="content">
                <div className="top">
                <div className="slider">
                   <Slider />
                </div>
                <div className="weather">
                    <Weather />
                </div>
                </div>
                
                <div className="main-content">
                    <div className="left-content">
                        <LatestNews />
                        <Categories />
                        <EditorsPicks />
                    </div>
                    <div className="right-sidebar">
                        <PopularPosts pageTitle="Popular Posts"/>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
