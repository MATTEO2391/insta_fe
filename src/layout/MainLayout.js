import React from "react";
import Navbar from "../components/Navbar/Navbar";
import FormPost from "../components/FormPost/FormPost"
import LatestPosts from "../components/LatestPosts/LatestPost";

const MainLayout = () => {

    return (
        <div >
            <Navbar/>
            <FormPost/>
            <LatestPosts/>
        </div>
    )
}

export default MainLayout