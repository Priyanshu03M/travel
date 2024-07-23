import react from "react";
import Link from "next/link";
import Button from "./button";

function Blog() {
    return (
        <div className="container">
            <div className="content">
                <h1>Hello Traveller</h1>
                <p>The world is yours to explore. Travel planning at its best. Build, organize, and map your custom itineraries in a free travel app designed for vacations & road trips, powered by our trip planner AI.</p>
                <Button/>
            </div>
            <div>
                <img src="/images/Travel.jpg" alt="Travel Image" className="image"/>
            </div>
        </div>
    );
}

export default Blog;