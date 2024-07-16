import Image from "next/image";
import Navbar from "./components/navbar";
import Blog from "./components/blog";
import Button from "./components/button";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Blog/>
      <Blog/>
    </div>
  );
}
