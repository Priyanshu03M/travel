import Navbar from "../components/Navbar";
import Blog from "../components/Blog";
import TestimonialCarousel from "../components/Testimonial";
import Footer from "../components/footer";
import ScrollToTopButton from "../components/moveTop";

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
