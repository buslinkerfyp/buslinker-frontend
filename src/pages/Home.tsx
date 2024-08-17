import { useRef } from "react"
import Footer from "../components/home/Footer"
import Header from "../components/home/Header"
import Section1 from "../components/home/Section1"
import Section2 from "../components/home/Section2"
import Section3 from "../components/home/Section3"

const Home = () => {

  const aboutRef_ = useRef(null);
  const faqRef = useRef(null);
  const footerRef = useRef(null);

  const scrollToSection = (ref: any) => {
    ref?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Header
        onAboutClick={() => scrollToSection(aboutRef_)}
        onReviewsClick={() => scrollToSection(faqRef)}
        onFAQsClick={() => scrollToSection(footerRef)}
      />
      <Section1 />
      <div ref={aboutRef_}><Section2 /></div>
      <div ref={faqRef}><Section3 /></div>
      <div ref={footerRef}><Footer /></div>
    </>
  )
}

export default Home