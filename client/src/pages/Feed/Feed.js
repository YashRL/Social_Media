import React, { useEffect, useState } from "react";
import Post from "./Post/Post";
import "./Feed.css";
import TweetBox from "./TweetBox/TweetBox";

function Feed() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        //fetch('https://pacific-peak-30751.herokuapp.com/post')
        fetch('https://pacific-peak-30751.herokuapp.com/post')
            .then(res => res.json())
            .then(data => {
                setPosts(data);
            })
    }, [posts])

    return (
        <div className="feed">
            <div className="feed__header">
                <h2>Home</h2>
            </div>
            <TweetBox />
            {
                posts.map(p => <Post key={p._id} p={p} />)
            }
        </div>

    )

}

export default Feed