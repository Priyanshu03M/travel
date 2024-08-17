"use client"
import Link from "next/link";
import { Container, Row } from "reactstrap";
import { useAuth } from "Qui/utils/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";

function Navbar() {
  const { isAuthenticated, logoutp} = useAuth();
  const logout = async () => {
    try {
      await axios.get('/api/users/logout')
      toast.success('Logout successful')
      logoutp();
    } catch(err) {
      console.log(err.message);
    }
  }
  return (
    <div className="w-[full] h-[80px] bg-white shadow-md p-5 mr-2 rounded-lg">
      <Container className="px-16">
        <Row>
          <div className="flex items-center justify-between w-full">
            {/* Logo */}
            <div className="w-[30%] flex items-center gap-5">
              {/* <Image src={image} alt="Logo"/> */}
              <span className="text-xl font-semibold">Logo</span>
              <div className="flex items-center gap-5">
                <Link href="/" className="text-blue-500 hover:text-blue-700">Home</Link>
                <Link href="/tours" className="text-blue-500 hover:text-blue-700">Tours</Link>
              </div>
            </div>
            {/* Logo */}

            {/* Menu start */}
            <div className="flex items-center gap-5 flex-grow justify-center">
              {/* <Link href="/trip"> */}
                <input className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" type="search" placeholder="Explore by destination" />
              {/* </Link> */}
            </div>
            {/* Menu start */}

            {/* Menu end */}
            <div className="flex items-center gap-5">
              {isAuthenticated ? (
                <>
                <Link href="/profile" className="text-blue-500 hover:text-blue-700">Profile</Link>
                <button onClick={logout} className="text-blue-500 hover:text-blue-700">Logout</button>
              </>
              ) : (
                <>
                  <Link href="/signUp" className="text-blue-500 hover:text-blue-700">Sign up</Link>
                  <Link href="/login" className="text-blue-500 hover:text-blue-700">Login</Link>
                </>
              )}
            </div>
            {/* Menu end */}
          </div>
        </Row>
      </Container>
    </div>
  );
}




export default Navbar;