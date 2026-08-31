import React from 'react'
import Button from "../components/Button";
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Container from '../components/Container';
import Features from "../components/Features/Features";
import TrustedBy from "../components/TrustedBy/TrustedBy.jsx";
import Footer from '../components/Footer/Footer.jsx';

function LandingPage() {
  return (
    <>
      <div className="min-h-screen bg-[#0A1832]">
        <Container>
          <Navbar />
          <Hero />
          <Features />
          <TrustedBy />
        </Container>
        <Footer />
      </div>
    </>
  );
}

export default LandingPage;