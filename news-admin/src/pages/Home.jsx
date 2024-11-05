import React from "react";
import AddArticles from "../components/add-article";
import DeleteArticle from "../components/Delete-aticle";
import UpdateArticle from "../components/update-article";

const Home = () => {
    return(
        <div>
        <h2>this is myhome</h2>
        <AddArticles />
        <UpdateArticle />
        <DeleteArticle />
        
      
        
      
       
        </div>
    )
}

export default Home;