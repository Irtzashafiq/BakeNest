import React from "react";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServiceSection";
import MenuSection from "../components/MenuSection";
import TestimonialsSection from "../components/TestimonialSection";
import History from "./HistoryPage";
import Footer from "../components/Footer/Footer";
import TextImagePage from "./TextImagePage";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <History />
      <TextImagePage />
      <ServicesSection />
      <MenuSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default HomePage;
