import react from "react";
import Link from "next/link";

function Navbar() {
    return (
        <header className="navbar">
            <div className="navbar-start">
                <Link href="/">LOGO</Link>
            </div>


            <div className="navbar-end">
                <input type="search" name="" placeholder="Explore by destination" id="search" />
                <div>
                    <Link href="/travel-guides">Travel guides</Link>
                </div>
                <div>
                    <Link href="./hotels">Hotels</Link>
                </div>
            </div>
            
        </header>
    );
}

export default Navbar;