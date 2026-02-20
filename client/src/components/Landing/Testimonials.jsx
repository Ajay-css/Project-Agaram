import React from "react";
import Logo from "../../assets/logo.png";

const Testimonials = () => {
    const cardsData = [
        {
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
            name: "Ajay Arumugam",
            role: "MERN Developer",
            message:
                "Agaram helped me gain real interview confidence. Gemini AI mock sessions felt exactly like real HR rounds. I improved my clarity and cracked my first tech interview!",
        },
        {
            image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
            name: "Manikandan",
            role: "Video Editor",
            message:
                "The instant feedback feature is insane. It showed where I lacked structure in answers. After practicing for 2 weeks, my confidence level doubled.",
        },
        {
            image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
            name: "Priya Dharshan",
            role: "Content Writer",
            message:
                "I was scared of interviews before Agaram. The AI practice environment made me comfortable. Now I speak confidently without hesitation.",
        },
        {
            image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
            name: "Bala Krishnan",
            role: "Technical Expert",
            message:
                "Performance tracking helped me understand my weak areas clearly. This platform feels like a personal interview mentor.",
        },
    ];

    const CreateCard = ({ card }) => (
        <div className="p-6 bg-white border border-gray-100 rounded-2xl mx-4 shadow-sm hover:shadow-xl transition-all duration-300 w-80 shrink-0">
            <div className="flex gap-3 items-center">
                <img
                    className="w-12 h-12 rounded-full object-cover"
                    src={card.image}
                    alt="User"
                />
                <div className="flex flex-col">
                    <p className="font-semibold text-gray-900">{card.name}</p>
                    <span className="text-xs text-gray-500">{card.role}</span>
                </div>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed mt-4">
                "{card.message}"
            </p>

            {/* Agaram Logo Footer */}
            <div className="flex items-center gap-2 mt-5 pt-4 border-t border-gray-100">
                <img src={Logo} alt="Agaram Logo" className="w-[7] h-5" />
                <span className="text-xs text-gray-500">Verified Agaram User</span>
            </div>
        </div>
    );

    return (
        <>
            <style>{`
            @keyframes marqueeScroll {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
            }

            .marquee-inner {
                animation: marqueeScroll 30s linear infinite;
            }

            .marquee-reverse {
                animation-direction: reverse;
            }
        `}</style>

            <section className="py-20 bg-white">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold text-gray-900">
                        What Peoples Says About Agaram
                    </h2>
                    <p className="text-gray-600 mt-3 max-w-xl mx-auto">
                        Real users. Real improvements. Real interview success stories.
                    </p>
                </div>

                {/* Row 1 */}
                <div className="w-full mx-auto max-w-6xl overflow-hidden relative">
                    <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>

                    <div className="marquee-inner flex transform-gpu min-w-[200%] pt-10 pb-5">
                        {[...cardsData, ...cardsData].map((card, index) => (
                            <CreateCard key={index} card={card} />
                        ))}
                    </div>

                    <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
                </div>

                {/* Row 2 */}
                <div className="w-full mx-auto max-w-6xl overflow-hidden relative mt-6">
                    <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent"></div>

                    <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] pt-10 pb-5">
                        {[...cardsData, ...cardsData].map((card, index) => (
                            <CreateCard key={index} card={card} />
                        ))}
                    </div>

                    <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent"></div>
                </div>
            </section>
        </>
    );
};

export default Testimonials;
