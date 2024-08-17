import Link from "next/link";
function Blog() {
    return (
        <div className="flex flex-wrap md:flex-nowrap">
            <div className="flex-1 p-8">
                <h1 className="text-3xl font-bold mb-4">Hello Traveller</h1>
                <p className="mb-6">
                    The world is yours to explore. Travel planning at its best. Build, organize, and map your custom itineraries in a free travel app designed for vacations & road trips, powered by our trip planner AI.
                </p>
                <div className="flex justify-center mt-4">
                    <Link href="./trip">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                            Start Planning
                        </button>
                    </Link>
                </div>
            </div>
            <div className="flex-1 flex items-center justify-center p-8">
                <img src="/images/Travel.jpg" alt="Travel Image" className="max-w-full h-auto rounded-lg" />
            </div>
        </div>
    );
}



export default Blog;