import React from 'react';
import '../styles/HomeView.css';

export default function HomeView() {
    return (<div className="home-view">
        <h1>This is the neighbours web app</h1>
        <p>Welcome, mortal. Here you can post messages to inform your neighbours or ask them something.</p>
        <p>If you are not living in this building, please leave now! Although you can see the residents
            by navigating from the bar above.</p>
        <p>If you are living in this building and not have registered yet,
        please don't hesitate and Sign up now for free.</p>
    </div>);
}