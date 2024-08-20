import Navbar from "../components/Navbar";
import Blog from "Qui/components/Blog";
import TestimonialCarousel from "Qui/components/Testimonial";
import Footer from "../components/footer";
import ScrollToTopButton from "Qui/components/moveTop";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Blog/>
      <TestimonialCarousel/>
      <ScrollToTopButton/>
      <Footer/>
    </div>
  );
}
