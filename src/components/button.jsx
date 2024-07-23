import react from "react";
import Link from 'next/link';


function Button() {
    return (
        <div className="button">
            <Link href="./new-trip">
                <button>Start Planning</button>
            </Link>
        </div>
    );
}

export default Button;