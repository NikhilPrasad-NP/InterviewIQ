export default function Footer() {
    return (
        <footer className="bg-[#020D25]">
            <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 sm:flex-row sm:items-center sm:justify-between sm:gap-4">

                {/* Left */}
                <div>
                    <h2 className="text-2xl font-bold text-[#B3CFE5]">
                        Interview<span className="text-[#4A7FA7]">IQ</span>
                    </h2>

                    <p className="mt-2 max-w-xs text-sm leading-5 text-[#B3CFE5]">
                        AI-powered interview preparation for ambitious professionals.
                    </p>
                </div>

                {/* Links */}
                <div className="flex items-center gap-8 text-sm text-white">
                    <a href="#" className="hover:text-[#B3CFE5]">
                        Privacy Policy
                    </a>

                    <a href="#" className="hover:text-[#B3CFE5]">
                        Terms of Service
                    </a>

                    <a href="#" className="hover:text-[#B3CFE5]">
                        Contact Support
                    </a>
                </div>

                {/* Icons */}
                <div className="flex items-center gap-3">
                    <button
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0D1B38] text-[#B3CFE5] hover:text-white"
                        aria-label="Website"
                    >
                        🌐
                    </button>

                    <button
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0D1B38] text-[#B3CFE5] hover:text-white"
                        aria-label="Share"
                    >
                        ↗
                    </button>
                </div>

            </div>
        </footer>
    );
}