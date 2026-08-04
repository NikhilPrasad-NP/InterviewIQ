import React from 'react'
import Button from "../Button";

function Navbar() {
    return (
        <nav className="flex items-center justify-between px-8 py-5">
            <h2 className="text-2xl font-bold text-white">InterviewIQ</h2>
            <ul className="flex gap-8 text-white">
                <li className="cursor-pointer hover:text-[#4A7FA7] transition-colors">Features</li>
                <li className="cursor-pointer hover:text-[#4A7FA7] transition-colors">Pricing</li>
                <li className="cursor-pointer hover:text-[#4A7FA7] transition-colors">About</li>
            </ul>

            <Button variant="outline">
                Sign In
            </Button>
        </nav>
    )
}

export default Navbar
