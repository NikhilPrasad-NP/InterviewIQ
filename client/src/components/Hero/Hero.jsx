import React from 'react'
import Button from "../Button";
import { Sparkles } from "lucide-react";

function Hero() {
  return (
    <section className=" py-20">
      <div className="flex items-center justify-between gap-10">

        {/* Left Side */}
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#2B4A6F] bg-[#11284A] text-[#98CCF8] text-sm font-medium">
            <Sparkles size={16} color="#98CCF8" />
            <span>Powered by Next-Gen AI</span>
          </div>

          <h1 className="mt-6 text-5xl font-bold leading-tight text-[#D8E2FF]">
            Ace Your Next <span className="text-[#98CCF8]"> Interview</span> with <br /> AI
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-300">
            Practice realistic AI-powered mock interviews, receive
            personalized feedback, and build the confidence you need
            to succeed in your next interview.
          </p>

          <div className="flex gap-4 mt-8">
            <Button variant="primary">
              Start Interview
            </Button>

            <Button variant="outline">
              View Demo
            </Button>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-[500px] h-[500px] rounded-3xl bg-[#1A3D63] flex items-center justify-center text-white text-xl">
          AI Illustration
        </div>

      </div>
    </section>
  );
}

export default Hero;
