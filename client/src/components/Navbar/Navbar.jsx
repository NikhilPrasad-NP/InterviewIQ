import React, { useState } from 'react'
import Button from "../Button";
import { Menu, X } from "lucide-react";
import { Link } from 'react-router-dom';
import { useAuth } from "@clerk/react";

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { isLoaded, isSignedIn } = useAuth()

    if (!isLoaded) {
        return null
    }
    return (
        <>
            <nav className="flex items-center justify-between py-5">
                <h2 className="text-2xl font-bold text-white">InterviewIQ</h2>
                <ul className="hidden lg:flex gap-8 text-white">
                    <li className="cursor-pointer hover:text-[#B3CFE5] transition-colors">Features</li>
                    <li className="cursor-pointer hover:text-[#B3CFE5] transition-colors">Pricing</li>
                    <li className="cursor-pointer hover:text-[#B3CFE5] transition-colors">About</li>
                </ul>

                <div className="flex items-center gap-3">
                    <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(true)}>
                        <Menu size={24} />
                    </button>
                    {isSignedIn ? (
                        <Link to="/dashboard">
                            <Button variant="primary" className="px-3 py-1.5 text-sm lg:px-7 lg:py-3.5 lg:text-base">
                                Dashboard
                            </Button>
                        </Link>
                    ) : (
                        <>
                            <Link to="/login">
                                <Button variant="outline" className="hidden lg:inline-flex">
                                    Log In
                                </Button>
                            </Link>

                            <Link to="/register">
                                <Button variant="primary" className="px-3 py-1.5 text-sm lg:px-7 lg:py-3.5 lg:text-base">
                                    Get Started
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </nav>
            {isMenuOpen && (
                <div className="fixed right-0 top-0 z-50 h-full w-72 translate-x-0 bg-[#0A1832]/10 backdrop-blur-md transition-transform duration-300 lg:hidden">
                    <button
                        className="absolute right-5 top-5 text-white "
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <X size={24} />
                    </button>
                    <div className="mt-20 flex flex-col gap-6 px-6 ">
                        <a href="#" className="text-lg text-white">
                            Features
                        </a>

                        <a href="#" className="text-lg text-white">
                            Pricing
                        </a>

                        <a href="#" className="text-lg text-white">
                            About
                        </a>
                        <Link to="/login">
                            <Button variant="outline" className="mt-4 w-full">
                                Log In
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </>
    )
}

export default Navbar
