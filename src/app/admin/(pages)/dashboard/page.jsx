import Link from 'next/link';
import Navbar from '../../../../components/Navbar';

export default function HomePage() {
  return (
    <div>
      <Navbar/>

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white p-6">
          <h2 className="text-2xl font-semibold mb-8">Admin Dashboard</h2>
          <nav className="flex flex-col gap-6">
            {/* Create Link */}
            <Link href="./create" className="bg-gray-700 hover:bg-gray-600 text-center py-2 px-4 rounded">
              Create
            </Link>

            {/* Display Link */}
            <Link href="./display" className="bg-gray-700 hover:bg-gray-600 text-center py-2 px-4 rounded">
              Display
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-10 bg-gray-100">
          <h1 className="text-3xl font-bold mb-6">Welcome to the Admin Dashboard</h1>
          <p>Select an option from the sidebar to proceed.</p>
        </main>
      </div>
    </div>
  );
}
