import React from 'react';
import './sideBar.css'

const SideBar = () => {
  const categories = [
    'Home',
    'Trending',
    'Subscriptions',
    'Library',
    'History',
    'Your Videos',
    'Watch Later',
    'Liked Videos',
    'Playlists',
    'Uploads',
    'Live Streaming',
    'Gaming',
    'Sports',
    'Music',
    'News',
    'Movies & Shows',
    'Learning & Education',
    'Virtual Reality'
  ];

  return (
    <div className="sidebar">
      <ul>
        {categories.map((category) => (
          <li key={category}>
            <a href="#">{category}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;