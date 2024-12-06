import React, { useEffect, useState } from 'react'

const CategoriesListed = () => {
    const[categories, setCategories] = useState[{}];

    const FetchCategories = async() => {
        const data = await fetch('http://127.0.0.1:5000/api/news/categories/sum');
        const cats = object.values(data);
        setCategories(cats); 
    }
    useEffect(() => {
        FetchCategories(); // Fetch data when the component mounts
    }, []);
    return(
        <div>
             <li>{cats}</li>
        </div>
    )
}
export default CategoriesListed;