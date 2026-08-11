import React from "react";
import { AudioLines, Code2, ChartNoAxesCombined, Building2 } from "lucide-react";

function Features() {
    return (
        <section className="py-24">
            <div className="text-center">
                <p className="text-sm font-medium uppercase tracking-wider text-[#4A7FA7]">
                    Designed for
                </p>

                <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
                    Technical Excellence
                </h2>
                <p className="mt-2 text-md font-medium text-[#C1C7C5] sm:text-lg">
                    Our platform mimics real-world interview environment with surgical precision
                </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
                <div className="group rounded-3xl border border-[#2A4566] bg-[#11284A] p-6 md:col-span-2">
                    <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-[#1A3D63]">
                        <AudioLines size={22} className="text-[#98CCF8]" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                        Voice & Tone Analysis
                    </h3>

                    <p className="mt-3 text-gray-400">
                        Get real-time insights into your communication, confidence, and tone.
                    </p>
                    <div className="mt-6">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-[#96ceff] font-medium">
                                Confidence
                            </span>

                            <span className="text-[#96ceff] font-medium">
                                94%
                            </span>
                        </div>

                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#0A1832]">
                            <div className="h-1.5 w-50 rounded-full bg-[#4A7FA7] transition-all duration-1000 group-hover:w-[94%]" />
                        </div>
                    </div>
                </div>

                <div className="rounded-3xl border border-[#2A4566] bg-[#11284A] p-6">
                    <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-[#1A3D63]">
                        <Code2 size={22} className="text-[#98CCF8]" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                        Live Coding
                    </h3>

                    <p className="mt-3 text-gray-400">
                        Practice technical problems in a realistic interview environment.
                    </p>

                </div>

                <div className="rounded-3xl border border-[#2A4566] bg-[#11284A] p-6">
                    <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-[#1A3D63]">
                        <ChartNoAxesCombined size={22} className="text-[#98CCF8]" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">
                        Deep Insights
                    </h3>

                    <p className="mt-3 text-gray-400">
                        Understand your strengths and identify areas where you can improve.
                    </p>
                </div>

                <div className="rounded-3xl border border-[#2A4566] bg-[#11284A] p-8 md:col-span-2">
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

                        {/* Left Content */}
                        <div className="flex-1">
                            <div className="mb-5 flex h-10 w-10 items-center justify-center">
                                <Building2 size={28} className="text-[#B3CFE5]" />
                            </div>

                            <h3 className="text-2xl font-semibold text-white">
                                Company Specific
                            </h3>

                            <p className="mt-3 max-w-md text-gray-400">
                                Simulate interviews for specific FAANG companies
                                based on actual past interview data and unique
                                company culture markers.
                            </p>
                        </div>

                        {/* Interview Configuration */}
                        <div className="w-full max-w-md rounded-xl border border-[#2A4566] bg-[#1A2F50] p-4 lg:w-[45%]">

                            {/* Window Controls */}
                            <div className="flex gap-2">
                                <span className="h-3 w-3 rounded-full bg-red-400" />
                                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                                <span className="h-3 w-3 rounded-full bg-green-400" />
                            </div>

                            {/* Details */}
                            <div className="mt-4 space-y-2 text-xs">
                                <div className="flex justify-between">
                                    <span className="text-gray-300">
                                        Interview Type:
                                    </span>

                                    <span className="text-[#B3CFE5]">
                                        System Design
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-300">
                                        Target:
                                    </span>

                                    <span className="text-[#B3CFE5]">
                                        Netflix L6
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-300">
                                        Duration:
                                    </span>

                                    <span className="text-[#B3CFE5]">
                                        45 mins
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default Features;