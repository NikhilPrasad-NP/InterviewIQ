import React from 'react'
import Button from "../components/Button";

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[#0A1832]">
      <h1 className="text-4xl font-bold text-white">
        Welcome to InterviewIQ
      </h1>

      <Button variant="primary">
        Start Interview
      </Button>

      <Button variant="secondary">
        Learn More
      </Button>

      <Button variant="outline">
        Sign In
      </Button>
    </div>
  );
}

export default LandingPage;