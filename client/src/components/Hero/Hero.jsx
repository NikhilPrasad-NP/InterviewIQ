import React from 'react'
import Button from "../Button";

function Hero() {
  return (
    <section className="px-8 py-20">
      <div className="flex items-center justify-between gap-10">

        {/* Left Side */}
        <div>
          <p className="text-[#4A7FA7] font-semibold">
            AI Powered Interview Preparation
          </p>

          <h1 className="text-6xl font-bold text-white mt-4">
            Ace Your Next
            <br />
            Interview
          </h1>

          <p className="text-gray-300 mt-6 max-w-xl">
            Practice with AI-powered mock interviews, receive
            instant feedback, and improve your confidence before
            your real interview.
          </p>

          <div className="flex gap-4 mt-8">
            <Button variant="primary">
              Start Free
            </Button>

            <Button variant="outline">
              Watch Demo
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
