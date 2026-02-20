import React from "react";
import { Link } from "react-router-dom"
import Logo from "../../assets/logo.png";

const Hero = () => {

    const [menuOpen, setMenuOpen] = React.useState(false);

    const companiesLogo = [
        {
            name: "Framer",
            logo: (
                <svg viewBox="0 0 24 24" className="h-7 w-auto">
                    <path fill="#0055FF" d="M12 2L4 10h8L4 18h8l8-8h-8l8-8h-8z" />
                </svg>
            )
        },
        {
            name: "Huawei",
            logo: (
                <svg viewBox="0 0 120 40" className="h-7 w-auto">
                    <text x="5" y="28" fontSize="24" fill="#C7000B" fontWeight="700">
                        HUAWEI
                    </text>
                </svg>
            )
        },
        {
            name: "Instagram",
            logo: (
                <svg viewBox="0 0 24 24" className="h-7 w-auto">
                    <defs>
                        <linearGradient id="ig-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#F58529" />
                            <stop offset="50%" stopColor="#DD2A7B" />
                            <stop offset="100%" stopColor="#515BD4" />
                        </linearGradient>
                    </defs>
                    <rect width="24" height="24" rx="6" fill="url(#ig-gradient)" />
                    <circle cx="12" cy="12" r="5" fill="#fff" />
                    <circle cx="18" cy="6" r="1.5" fill="#fff" />
                </svg>
            )
        },
        {
            name: "Microsoft",
            logo: (
                <svg viewBox="0 0 24 24" className="h-7 w-auto">
                    <rect x="1" y="1" width="10" height="10" fill="#F25022" />
                    <rect x="13" y="1" width="10" height="10" fill="#7FBA00" />
                    <rect x="1" y="13" width="10" height="10" fill="#00A4EF" />
                    <rect x="13" y="13" width="10" height="10" fill="#FFB900" />
                </svg>
            )
        },
        {
            name: "Walmart",
            logo: (
                <svg viewBox="0 0 140 40" className="h-7 w-auto">
                    <text x="5" y="28" fontSize="22" fill="#0071CE" fontWeight="600">
                        Walmart
                    </text>
                    <g fill="#FFC220">
                        <circle cx="115" cy="20" r="3" />
                        <circle cx="125" cy="12" r="3" />
                        <circle cx="125" cy="28" r="3" />
                        <circle cx="135" cy="20" r="3" />
                        <circle cx="125" cy="20" r="3" />
                    </g>
                </svg>
            )
        },
        {
            name: "Google",
            logo: (
                <svg viewBox="0 0 48 48" className="h-7 w-auto">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.69 1.22 9.18 3.61l6.85-6.85C35.64 2.24 30.2 0 24 0 14.64 0 6.59 5.48 2.69 13.44l7.98 6.2C12.52 13.11 17.77 9.5 24 9.5z" />
                    <path fill="#34A853" d="M46.1 24.55c0-1.63-.15-3.2-.43-4.72H24v9.02h12.43c-.54 2.9-2.18 5.36-4.65 7.02l7.19 5.6c4.2-3.87 6.63-9.58 6.63-16.92z" />
                    <path fill="#FBBC05" d="M10.67 28.36A14.48 14.48 0 0 1 9.5 24c0-1.51.26-2.97.72-4.36l-7.98-6.2A23.96 23.96 0 0 0 0 24c0 3.93.94 7.65 2.69 10.56l7.98-6.2z" />
                    <path fill="#4285F4" d="M24 48c6.48 0 11.92-2.14 15.89-5.82l-7.19-5.6c-2 1.34-4.56 2.14-8.7 2.14-6.23 0-11.48-3.61-13.33-8.84l-7.98 6.2C6.59 42.52 14.64 48 24 48z" />
                </svg>
            )
        }
    ];

    return (
        <>
            <div className="min-h-screen pb-20">
                {/* Navbar */}
                <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-40 text-sm">
                    <Link to={"/"}>
                        <img src={Logo} alt="logo" loading="lazy" className="w-[180px]" />
                    </Link>

                    <div className="hidden md:flex items-center gap-8 transition duration-500 text-slate-800">
                        <a href="#" className="hover:text-indigo-600 transition">Home</a>
                        <a href="#features" className="hover:text-indigo-600 transition">Features</a>
                        <a href="#testimonials" className="hover:text-indigo-600 transition">Testimonials</a>
                        <a href="#cta" className="hover:text-indigo-600 transition">Contact</a>
                    </div>

                    <div className="flex gap-2">
                        <Link to={"/register"} className="hidden md:block px-6 py-2 bg-indigo-500 hover:bg-indigo-700 active:scale-95 transition-all rounded-full text-white">
                            Get started
                        </Link>
                    </div>

                    <button onClick={() => setMenuOpen(true)} className="md:hidden active:scale-90 transition" >
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" className="lucide lucide-menu" >
                            <path d="M4 5h16M4 12h16M4 19h16" />
                        </svg>
                    </button>
                </nav>

                {/* Mobile Menu */}
                <div className={`fixed inset-0 z-[100] bg-black/40 text-black backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`} >
                    <a href="/" className="text-white">Home</a>
                    <a href="/products" className="text-white">Home</a>
                    <a href="/stories" className="text-white">Features</a>
                    <a href="/pricing" className="text-white">Reviews</a>
                    <Link to={"/register"} className="hidden md:block px-6 py-2 bg-indigo-500 hover:bg-indigo-700 active:scale-95 transition-all rounded-full text-white">
                        Get started
                    </Link>
                    <button onClick={() => setMenuOpen(false)} className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-indigo-600 hover:bg-indigo-700 transition text-white rounded-md flex" >
                        X
                    </button>
                </div>

                {/* Hero Section */}
                <div className="relative flex flex-col items-center justify-center text-sm px-4 md:px-16 lg:px-24 xl:px-40 text-black">
                    <div className="absolute top-28 xl:top-10 -z-10 left-1/4 size-72 sm:size-96 xl:size-120 2xl:size-132 bg-indigo-300 blur-[100px] opacity-30"></div>

                    {/* Avatars + Stars */}
                    <div className="flex items-center mt-24">
                        <div className="flex -space-x-3 pr-3">
                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" alt="user3" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[1]" />
                            <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="user1" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-2" />
                            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" alt="user2" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[3]" />
                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" alt="user3" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[4]" />
                            <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="user5" className="size-8 rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[5]" />
                        </div>

                        <div>
                            <div className="flex ">
                                {Array(5).fill(0).map((_, i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star text-transparent fill-indigo-600" aria-hidden="true"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
                                ))}
                            </div>
                            <p className="text-sm text-gray-700">
                                Used by 10,000+ users
                            </p>
                        </div>
                    </div>

                    {/* Headline + CTA */}
                    <h1 className="text-5xl md:text-6xl font-semibold max-w-5xl text-center mt-4 md:leading-[70px]">
                        Master Your Interviews with <span className=" bg-gradient-to-r from-indigo-700 to-indigo-600 bg-clip-text text-transparent text-nowrap">Agaram </span> Platform.
                    </h1>

                    <p className="max-w-md text-center text-base my-7">Practice real interview questions, get instant feedback, and build job-ready confidence — all in one platform.</p>

                    {/* CTA Buttons */}
                    <div className="flex items-center gap-4 ">
                        <Link to='/login' className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-full px-9 h-12 m-1 ring-offset-2 ring-1 ring-indigo-400 flex items-center transition-colors">
                            Get started
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-1 size-4" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                        </Link>
                    </div>

                    <p className="py-6 text-slate-600 mt-14">Trusting by leading brands, including</p>

                    <div className="flex flex-wrap justify-between max-sm:justify-center gap-6 max-w-3xl w-full mx-auto py-4" id="logo-container">
                        {companiesLogo.map((company, index) => (
                            <div key={index} className="flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition duration-300">
                                {company.logo}
                                <span className="text-sm font-medium text-gray-600">
                                    {company.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

                    * {
                        font-family: 'Poppins', sans-serif;
                    }
                `}
            </style>
        </>
    );
}

export default Hero