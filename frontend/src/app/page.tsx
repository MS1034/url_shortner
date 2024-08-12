// "use client";
import JWTHelper from "@/commons/helpers/JwtHelper";
import Link from "next/link";
import React from "react";
import Navbar from "@/components/NavBar";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/FeaturesSection";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <Features />
      <Footer />
    </main>
  );
}
