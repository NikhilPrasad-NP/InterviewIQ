import React, { useRef } from "react";
import Button from "../Button";
import { Sparkles, ShieldCheck, BadgeCheck } from "lucide-react";

function Hero() {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;

    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 5;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
  };
  const handleMouseLeave = () => {
  const card = cardRef.current;

  if (!card) return;

  card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
};
  return (
    <section className=" py-20">
      <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between">

        {/* Left Side */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#2B4A6F] bg-[#11284A] text-[#98CCF8] text-sm font-medium">
            <Sparkles size={16} color="#98CCF8" />
            <span>Powered by Next-Gen AI</span>
          </div>

          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-5xl font-bold leading-tight text-[#D8E2FF]">
            Ace Your Next <span className="text-[#98CCF8]"> Interview</span> with <br /> AI
          </h1>

          <p className="mt-6 max-w-xl text-base font-medium leading-7 text-[#bbc3cb] sm:text-lg sm:leading-8">
            Experience high-stakes interview simulations with a technical precision Al. Get real-time feedback, behavioral insights, and technical validation to land your dream job.
          </p>

          <div className="mt-10 flex w-full flex-col items-center gap-4 text-lg sm:flex-row sm:justify-center lg:w-auto lg:justify-start">
            <Button variant="primary" className="w-full sm:w-auto">
              Start Interview
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              View Demo
            </Button>
          </div>
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-[#B3CFE5] lg:justify-start">
            <div className="flex items-center gap-2">
              <BadgeCheck size={18} />
              <span>TechCorp Approved</span>
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck size={18} />
              <span>Privacy Focused</span>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full max-w-lg">
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
             onMouseLeave={handleMouseLeave}
            className="rounded-3xl border border-[#2A4566] bg-[#11284A] p-6 shadow-2xl ">

            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1A3D63]">
                  <Sparkles size={20} className="text-[#B3CFE5]" />
                </div>

                <div>
                  <p className="font-semibold text-white">
                    AI Interview
                  </p>

                  <p className="text-sm text-gray-400">
                    Frontend Developer
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                Live
              </span>
            </div>

            {/* Progress */}
            <div className="mt-8">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300">
                  Interview Progress
                </span>

                <span className="text-[#B3CFE5]">
                  7 / 10
                </span>
              </div>

              <div className="mt-3 h-2 rounded-full bg-[#0A1832]">
                <div className="h-2 w-[70%] rounded-full bg-[#4A7FA7]" />
              </div>
            </div>

            {/* Scores */}
            <div className="mt-8 space-y-5">

              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">
                    Confidence
                  </span>

                  <span className="text-white">
                    92%
                  </span>
                </div>

                <div className="mt-2 h-1.5 rounded-full bg-[#0A1832]">
                  <div className="h-1.5 w-[92%] rounded-full bg-[#4A7FA7]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">
                    Communication
                  </span>

                  <span className="text-white">
                    88%
                  </span>
                </div>

                <div className="mt-2 h-1.5 rounded-full bg-[#0A1832]">
                  <div className="h-1.5 w-[88%] rounded-full bg-[#4A7FA7]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">
                    Technical
                  </span>

                  <span className="text-white">
                    95%
                  </span>
                </div>

                <div className="mt-2 h-1.5 rounded-full bg-[#0A1832]">
                  <div className="h-1.5 w-[95%] rounded-full bg-[#4A7FA7]" />
                </div>
              </div>

            </div>

            {/* Analysis */}
            <div className="mt-8 flex items-center gap-3 rounded-2xl border border-[#2A4566] bg-[#0A1832]/60 p-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10">
                <BadgeCheck size={18} className="text-emerald-400" />
              </div>

              <div>
                <p className="text-sm font-medium text-white">
                  AI Analysis Complete
                </p>

                <p className="text-xs text-gray-400">
                  Your performance is looking great.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;
