import Link from 'next/link';
import { FaHome } from 'react-icons/fa';

export default function HomeIcon() {
  return (
    <Link href="/admin/dashboard" passHref>
      <div className="cursor-pointer text-blue-500 hover:text-blue-700">
        <FaHome size={30} />
      </div>
    </Link>
  );
}
