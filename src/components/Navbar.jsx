"use client";
import Link from "next/link";
import { Container, Row } from "reactstrap";
import { useAuth } from "Qui/utils/AuthContext";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";

const fetchUsers = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/users/login', { cache: 'no-store' });
    if (!res.ok) {
      toast.error("Users not fetched");
      return { users: [] };
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return { users: [] }; 
  }
};

function Navbar() {
  const { isAuthenticated, logoutp, user } = useAuth();
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [ID, setID] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await fetchUsers();
        console.log("Fetched data:", data);
        if (Array.isArray(data.users)) {
          setUsers(data.users);
        } else {
          console.error("Data.users is not an array:", data);
        }
      } catch (error) {
        console.error("Error setting users:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (user?.email) {
      const foundUser = users.find(up => up.email === user.email);
      if (foundUser) {
        setName(foundUser.username);
        setID(foundUser._id);
        setIsAdmin(foundUser.isAdmin);
      }
    }
  }, [users, user?.email]);

  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      toast.success('Logout successful');
      logoutp();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="w-[full] h-[80px] bg-white shadow-md p-5 mr-2 rounded-lg">
      <Container className="px-16">
        <Row>
          <div className="flex items-center justify-between w-full">
            {/* Logo */}
            <div className="w-[30%] flex items-center gap-5">
              <span className="text-xl font-semibold">Logo</span>
              <div className="flex items-center gap-5">
                <Link href="/" className="text-blue-500 hover:text-blue-700">Home</Link>
                <Link href="/tours" className="text-blue-500 hover:text-blue-700">Tours</Link>
              </div>
            </div>
            {/* Logo */}

            {/* Menu start */}
            <div className="flex items-center gap-5 flex-grow justify-center">
              <input className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" type="search" placeholder="Explore by destination" />
            </div>
            {/* Menu start */}

            {/* Menu end */}
            <div className="flex items-center gap-5">
              {isAuthenticated ? (
                <>
                  {isAdmin ? (
                    <>
                      <Link href="/admin/dashboard" className="text-blue-500 hover:text-blue-700">{name}</Link>
                    </>
                  ) : (
                    <>
                      <Link href={`/profile/${ID}`} className="text-blue-500 hover:text-blue-700">{name}</Link>
                    </>
                  )}
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
