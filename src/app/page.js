import Image from "next/image";
import Navbar from "../components/navbar/navbar";
import Blog from "../components/blog";
import BestHostels from "../components/best-hotels/BestHostels";
import PopularCity from "Qui/components/PopularCity/PopularCity";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Blog/>
      <PopularCity/>
      <BestHostels/>
    </div>
  );
}
