// Home.js
import React from 'react'; 
import Navigation from '../components/Navigation';
import Slider from '../components/slider';
import LatestNews from '../components/LatestNews';
import Categories from '../components/Categories';
import EditorsPicks from '../components/EditorsPicks';
import PopularPosts from '../components/PopularPosts';
import Comments from '../components/Comments';
import Footer from '../components/Footer';

import '../static/home.css'; 

const Home = () => {
    return (
        <div>
            <Navigation />
            <div className="content">
                <Slider />
                <div className="main-content">
                    <div className="left-content">
                        <LatestNews />
                        <Categories />
                        <EditorsPicks />
                    </div>
                    <div className="right-sidebar">
                        <PopularPosts />
                    </div>
                </div>
            </div>
            <Comments />
            <Footer />
        </div>
    );
};

export default Home;
