'use client';

import Feed from "@components/Feed";
import { useState } from "react";

const Home = () => {
  const [feedPosts, setFeedPosts] = useState([]);

  const updateFeed = (updatedPosts) => {
    setFeedPosts(updatedPosts);
  };

  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            Discover & Share
            <br className="max-md:hidden"/>
            <span className="cyan_gradient">AI-Powered Prompts</span>
        </h1>
        <p className="desc text-center">
            Promptassist is an open-source AI prompting tool for modern world to discover, create and share creative prompts
        </p>
        <Feed updateFeed={updateFeed} />
    </section>
  )
}

export default Home;