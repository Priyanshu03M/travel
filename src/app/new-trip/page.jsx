import Blog from "../../components/blog";
import Navbar from "../../components/navbar/navbar";

function Plan(){
    return (
        <div className="container">
            <div className="row">
                <h3>Plan a new Trip</h3>
                <form action="https://formsubmit.co/Mohitknkush@gmail.com" method="POST">
                    <input name="Destination" type="text" placeholder="Destination"/>
                    <input name="Date" type="date"/>
                    <button>Send</button>
                </form>
            </div>
            <Navbar/>
        </div>
    );
}

export default Plan;