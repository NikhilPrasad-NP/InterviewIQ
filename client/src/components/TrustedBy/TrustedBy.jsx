import React from 'react'
import Carousel from "../Carousel/Carousel";

function TrustedBy() {
    return (
        <section className="py-24">
            <div className="text-left">
                <p className="text-sm font-medium uppercase tracking-wider text-[#4A7FA7]">
                    Trusted by the best
                </p>

                <h2 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
                    Trusted by the best
                </h2>

                <p className="mt-4 max-w-2xl text-gray-400">
                    See how professionals are using InterviewIQ to prepare for their next interview.
                </p>
            </div>
            <Carousel
                items={[
                    {
                        id: 1,
                        name: "Sarah Jenkins",
                        initials: "SJ",
                        role: "Frontend Developer",
                        company: "TechCorp",
                        quote: "InterviewIQ helped me feel much more confident going into my technical interviews."
                    },
                    {
                        id: 2,
                        name: "David Chen",
                        initials: "DC",
                        role: "Software Engineer",
                        company: "Nova",
                        quote: "The realistic interview experience helped me identify exactly where I needed to improve."
                    },
                    {
                        id: 3,
                        name: "Marcus Rodriguez",
                        initials: "MR",
                        role: "Full Stack Developer",
                        company: "Vertex",
                        quote: "The AI feedback gave me a much clearer understanding of my communication and technical skills."
                    },
                    {
                        id: 4,
                        name: "Alex roo",
                        initials: "SJ",
                        role: "Frontend Developer",
                        company: "TechCorp",
                        quote: "InterviewIQ helped me feel much more confident going into my technical interviews."
                    },
                    {
                        id: 5,
                        name: "Abhijeet vish",
                        initials: "DC",
                        role: "Software Engineer",
                        company: "Nova",
                        quote: "The realistic interview experience helped me identify exactly where I needed to improve."
                    },
                    {
                        id: 6,
                        name: "Nikhil Prasad",
                        initials: "MR",
                        role: "Full Stack Developer",
                        company: "Vertex",
                        quote: "The AI feedback gave me a much clearer understanding of my communication and technical skills."
                    },
                ]}
                showArrows
            />
        </section>
    )
}

export default TrustedBy
