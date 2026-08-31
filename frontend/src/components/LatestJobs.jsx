import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const LatestJobs = () => {
    const { allJobs = [] } = useSelector(
        (store) => store.job
    );

    return (
        <div className="max-w-7xl mx-auto my-20 px-4">

            {/* ================= HEADING ================= */}

            <motion.h1
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                whileInView={{
                    opacity: 1,
                    y: 0,
                }}
                viewport={{
                    once: true,
                    amount: 0.3,
                }}
                transition={{
                    duration: 0.5,
                    ease: "easeOut",
                }}
                className="text-4xl font-bold"
            >
                <span className="text-[#6A38C2]">
                    Latest & Top
                </span>{" "}
                Job Openings
            </motion.h1>

            {/* ================= JOB CARDS ================= */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">

                {allJobs.length <= 0 ? (

                    <motion.span
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        transition={{
                            duration: 0.4,
                        }}
                        className="text-gray-500"
                    >
                        No Job Available
                    </motion.span>

                ) : (

                    allJobs
                        ?.slice(0, 6)
                        .map((job, index) => (

                            <motion.div
                                key={job?._id}
                                initial={{
                                    opacity: 0,
                                    y: 30,
                                }}
                                whileInView={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                viewport={{
                                    once: true,
                                    amount: 0.15,
                                }}
                                transition={{
                                    duration: 0.4,
                                    delay: index * 0.08,
                                    ease: "easeOut",
                                }}
                                whileHover={{
                                    y: -5,
                                }}
                            >
                                <LatestJobCards
                                    job={job}
                                />
                            </motion.div>

                        ))
                )}

            </div>


            {/* ====================================================== */}
            {/* ================= COMPANIES SECTION ================== */}
            {/* ====================================================== */}

            <motion.section
                initial={{
                    opacity: 0,
                    y: 30,
                }}
                whileInView={{
                    opacity: 1,
                    y: 0,
                }}
                viewport={{
                    once: true,
                    amount: 0.15,
                }}
                transition={{
                    duration: 0.6,
                }}
                className="w-full bg-[#fffaf8] rounded-2xl py-12 px-5 mt-16"
            >

                {/* ================= TITLE ================= */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 15,
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}
                    viewport={{
                        once: true,
                    }}
                    transition={{
                        duration: 0.5,
                    }}
                    className="text-center mb-10"
                >

                    <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                        Work With Exciting 100+
                        <span className="text-sky-400 ml-2">
                            Companies
                        </span>{" "}
                        In The World
                    </h2>

                </motion.div>


                {/* ================================================= */}
                {/* ================= TESTIMONIALS ================== */}
                {/* ================================================= */}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">


                    {/* ================= TESTIMONIAL 1 ================= */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 25,
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                        }}
                        viewport={{
                            once: true,
                        }}
                        transition={{
                            duration: 0.4,
                            delay: 0.1,
                        }}
                        whileHover={{
                            y: -6,
                        }}
                        className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
                    >

                        <div className="flex items-center gap-3 mb-4">

                            <img
                                src="https://i.pravatar.cc/100?img=47"
                                alt="Sarah Johnson"
                                className="w-12 h-12 rounded-full object-cover"
                            />

                            <div>
                                <h3 className="font-bold text-gray-800 text-sm">
                                    Sarah Johnson
                                </h3>

                                <p className="text-xs text-gray-400">
                                    Google
                                </p>
                            </div>

                        </div>

                        <div className="text-yellow-400 text-sm mb-3">
                            ★★★★★
                        </div>

                        <p className="text-sm text-gray-500 leading-6">
                            "We found talented professionals quickly
                            and easily. The hiring experience was smooth
                            and efficient."
                        </p>

                    </motion.div>


                    {/* ================= TESTIMONIAL 2 ================= */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 25,
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                        }}
                        viewport={{
                            once: true,
                        }}
                        transition={{
                            duration: 0.4,
                            delay: 0.2,
                        }}
                        whileHover={{
                            y: -6,
                        }}
                        className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
                    >

                        <div className="flex items-center gap-3 mb-4">

                            <img
                                src="https://i.pravatar.cc/100?img=12"
                                alt="Michael Smith"
                                className="w-12 h-12 rounded-full object-cover"
                            />

                            <div>
                                <h3 className="font-bold text-gray-800 text-sm">
                                    Michael Smith
                                </h3>

                                <p className="text-xs text-gray-400">
                                    Microsoft
                                </p>
                            </div>

                        </div>

                        <div className="text-yellow-400 text-sm mb-3">
                            ★★★★★
                        </div>

                        <p className="text-sm text-gray-500 leading-6">
                            "This platform helped us connect with skilled
                            candidates who were the perfect fit for our
                            growing team."
                        </p>

                    </motion.div>


                    {/* ================= TESTIMONIAL 3 ================= */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 25,
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                        }}
                        viewport={{
                            once: true,
                        }}
                        transition={{
                            duration: 0.4,
                            delay: 0.3,
                        }}
                        whileHover={{
                            y: -6,
                        }}
                        className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
                    >

                        <div className="flex items-center gap-3 mb-4">

                            <img
                                src="https://i.pravatar.cc/100?img=11"
                                alt="Alex Morgan"
                                className="w-12 h-12 rounded-full object-cover"
                            />

                            <div>
                                <h3 className="font-bold text-gray-800 text-sm">
                                    Alex Morgan
                                </h3>

                                <p className="text-xs text-gray-400">
                                    Amazon
                                </p>
                            </div>

                        </div>

                        <div className="text-yellow-400 text-sm mb-3">
                            ★★★★★
                        </div>

                        <p className="text-sm text-gray-500 leading-6">
                            "A simple and powerful way to discover great
                            talent. It has made our recruitment process
                            much faster."
                        </p>

                    </motion.div>


                    {/* ================= TESTIMONIAL 4 ================= */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 25,
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                        }}
                        viewport={{
                            once: true,
                        }}
                        transition={{
                            duration: 0.4,
                            delay: 0.4,
                        }}
                        whileHover={{
                            y: -6,
                        }}
                        className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
                    >

                        <div className="flex items-center gap-3 mb-4">

                            <img
                                src="https://i.pravatar.cc/100?img=44"
                                alt="Emily Davis"
                                className="w-12 h-12 rounded-full object-cover"
                            />

                            <div>
                                <h3 className="font-bold text-gray-800 text-sm">
                                    Emily Davis
                                </h3>

                                <p className="text-xs text-gray-400">
                                    Adobe
                                </p>
                            </div>

                        </div>

                        <div className="text-yellow-400 text-sm mb-3">
                            ★★★★★
                        </div>

                        <p className="text-sm text-gray-500 leading-6">
                            "The quality of candidates is impressive.
                            We were able to build our team with confidence."
                        </p>

                    </motion.div>


                    {/* ================= TESTIMONIAL 5 ================= */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 25,
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                        }}
                        viewport={{
                            once: true,
                        }}
                        transition={{
                            duration: 0.4,
                            delay: 0.5,
                        }}
                        whileHover={{
                            y: -6,
                        }}
                        className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
                    >

                        <div className="flex items-center gap-3 mb-4">

                            <img
                                src="https://i.pravatar.cc/100?img=68"
                                alt="James Wilson"
                                className="w-12 h-12 rounded-full object-cover"
                            />

                            <div>
                                <h3 className="font-bold text-gray-800 text-sm">
                                    James Wilson
                                </h3>

                                <p className="text-xs text-gray-400">
                                    HubSpot
                                </p>
                            </div>

                        </div>

                        <div className="text-yellow-400 text-sm mb-3">
                            ★★★★★
                        </div>

                        <p className="text-sm text-gray-500 leading-6">
                            "An excellent platform for finding the right
                            people. The entire hiring journey feels simple
                            and professional."
                        </p>

                    </motion.div>

                </div>


                {/* ================================================= */}
                {/* ================= COMPANY LOGOS ================= */}
                {/* ================================================= */}

                <motion.div
                    initial={{
                        opacity: 0,
                    }}
                    whileInView={{
                        opacity: 1,
                    }}
                    viewport={{
                        once: true,
                    }}
                    transition={{
                        duration: 0.6,
                        delay: 0.2,
                    }}
                    className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 mt-12"
                >

                    {/* GOOGLE */}
                    <motion.div
                        whileHover={{ scale: 1.08 }}
                        className="flex items-center gap-2"
                    >
                        <div className="text-2xl font-bold text-blue-500">
                            G
                        </div>

                        <span className="text-lg font-semibold text-gray-600">
                            Google
                        </span>
                    </motion.div>


                    {/* MICROSOFT */}
                    <motion.div
                        whileHover={{ scale: 1.08 }}
                        className="flex items-center gap-2"
                    >
                        <div className="grid grid-cols-2 gap-[2px] w-7 h-7">
                            <span className="bg-red-500"></span>
                            <span className="bg-green-500"></span>
                            <span className="bg-blue-500"></span>
                            <span className="bg-yellow-500"></span>
                        </div>

                        <span className="text-lg font-semibold text-gray-600">
                            Microsoft
                        </span>
                    </motion.div>


                    {/* AMAZON */}
                    <motion.div
                        whileHover={{ scale: 1.08 }}
                        className="flex items-center gap-2"
                    >
                        <div className="w-8 h-8 rounded-md bg-black flex items-center justify-center">
                            <span className="text-white font-bold">
                                a
                            </span>
                        </div>

                        <span className="text-lg font-semibold text-gray-600">
                            Amazon
                        </span>
                    </motion.div>


                    {/* APPLE */}
                    <motion.div
                        whileHover={{ scale: 1.08 }}
                        className="flex items-center gap-2"
                    >
                        <div className="text-2xl text-gray-700">
                            ●
                        </div>

                        <span className="text-lg font-semibold text-gray-600">
                            Apple
                        </span>
                    </motion.div>


                    {/* META */}
                    <motion.div
                        whileHover={{ scale: 1.08 }}
                        className="flex items-center gap-2"
                    >
                        <div className="text-2xl font-bold text-blue-500">
                            ∞
                        </div>

                        <span className="text-lg font-semibold text-gray-600">
                            Meta
                        </span>
                    </motion.div>


                    {/* ADOBE */}
                    <motion.div
                        whileHover={{ scale: 1.08 }}
                        className="flex items-center gap-2"
                    >
                        <div className="w-8 h-8 rounded bg-red-50 flex items-center justify-center">
                            <span className="text-red-600 font-bold">
                                A
                            </span>
                        </div>

                        <span className="text-lg font-semibold text-gray-600">
                            Adobe
                        </span>
                    </motion.div>


                    {/* NETFLIX */}
                    <motion.div
                        whileHover={{ scale: 1.08 }}
                        className="flex items-center gap-2"
                    >
                        <div className="text-2xl font-bold text-red-600">
                            N
                        </div>

                        <span className="text-lg font-semibold text-gray-600">
                            Netflix
                        </span>
                    </motion.div>


                    {/* SHOPIFY */}
                    <motion.div
                        whileHover={{ scale: 1.08 }}
                        className="flex items-center gap-2"
                    >
                        <div className="w-8 h-8 rounded bg-green-50 flex items-center justify-center">
                            <span className="text-green-600 font-bold">
                                $
                            </span>
                        </div>

                        <span className="text-lg font-semibold text-gray-600">
                            Shopify
                        </span>
                    </motion.div>


                    {/* SLACK */}
                    <motion.div
                        whileHover={{ scale: 1.08 }}
                        className="flex items-center gap-2"
                    >
                        <div className="text-2xl font-bold text-purple-500">
                            ✣
                        </div>

                        <span className="text-lg font-semibold text-gray-600">
                            Slack
                        </span>
                    </motion.div>


                    {/* HUBSPOT */}
                    <motion.div
                        whileHover={{ scale: 1.08 }}
                        className="flex items-center gap-2"
                    >
                        <div className="w-8 h-8 rounded bg-orange-50 flex items-center justify-center">
                            <span className="text-orange-500 font-bold">
                                H
                            </span>
                        </div>

                        <span className="text-lg font-semibold text-gray-600">
                            HubSpot
                        </span>
                    </motion.div>

                </motion.div>

            </motion.section>


            {/* ====================================================== */}
            {/* ================= WHY CHOOSE SECTION ================= */}
            {/* ====================================================== */}

            <motion.section
                initial={{
                    opacity: 0,
                    y: 30,
                }}
                whileInView={{
                    opacity: 1,
                    y: 0,
                }}
                viewport={{
                    once: true,
                    amount: 0.2,
                }}
                transition={{
                    duration: 0.6,
                }}
                className="py-16"
            >

                <div className="text-center mb-10">

                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Why Choose{" "}
                        <span className="text-[#6A38C2]">
                            Job Portal?
                        </span>
                    </h2>

                    <p className="text-gray-500 mt-3">
                        Everything you need to find your next opportunity.
                    </p>

                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">


                    {/* FAST SEARCH */}

                    <motion.div
                        whileHover={{
                            y: -7,
                        }}
                        className="text-center p-7 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-all"
                    >

                        <div className="w-16 h-16 mx-auto rounded-full bg-purple-100 flex items-center justify-center mb-5">

                            <span className="text-3xl text-[#6A38C2]">
                                ⚡
                            </span>

                        </div>

                        <h3 className="text-lg font-bold text-gray-800">
                            Fast Job Search
                        </h3>

                        <p className="text-sm text-gray-500 mt-2 leading-6">
                            Find relevant jobs quickly with our smart
                            and simple search experience.
                        </p>

                    </motion.div>


                    {/* TRUSTED COMPANIES */}

                    <motion.div
                        whileHover={{
                            y: -7,
                        }}
                        className="text-center p-7 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-all"
                    >

                        <div className="w-16 h-16 mx-auto rounded-full bg-purple-100 flex items-center justify-center mb-5">

                            <span className="text-3xl text-[#6A38C2]">
                                🛡️
                            </span>

                        </div>

                        <h3 className="text-lg font-bold text-gray-800">
                            Trusted Companies
                        </h3>

                        <p className="text-sm text-gray-500 mt-2 leading-6">
                            Connect with verified and trusted employers
                            from different industries.
                        </p>

                    </motion.div>


                    {/* OPPORTUNITIES */}

                    <motion.div
                        whileHover={{
                            y: -7,
                        }}
                        className="text-center p-7 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-all"
                    >

                        <div className="w-16 h-16 mx-auto rounded-full bg-purple-100 flex items-center justify-center mb-5">

                            <span className="text-3xl text-[#6A38C2]">
                                🎯
                            </span>

                        </div>

                        <h3 className="text-lg font-bold text-gray-800">
                            Better Opportunities
                        </h3>

                        <p className="text-sm text-gray-500 mt-2 leading-6">
                            Discover jobs that match your skills,
                            experience and career goals.
                        </p>

                    </motion.div>


                    {/* EASY APPLICATION */}

                    <motion.div
                        whileHover={{
                            y: -7,
                        }}
                        className="text-center p-7 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-all"
                    >

                        <div className="w-16 h-16 mx-auto rounded-full bg-purple-100 flex items-center justify-center mb-5">

                            <span className="text-3xl text-[#6A38C2]">
                                📄
                            </span>

                        </div>

                        <h3 className="text-lg font-bold text-gray-800">
                            Easy Applications
                        </h3>

                        <p className="text-sm text-gray-500 mt-2 leading-6">
                            Apply to your dream jobs in just a few
                            clicks without any hassle.
                        </p>

                    </motion.div>

                </div>

            </motion.section>


            {/* ====================================================== */}
            {/* ===================== STATS ========================== */}
            {/* ====================================================== */}

            <motion.section
                initial={{
                    opacity: 0,
                    y: 25,
                }}
                whileInView={{
                    opacity: 1,
                    y: 0,
                }}
                viewport={{
                    once: true,
                }}
                transition={{
                    duration: 0.6,
                }}
                className="bg-[#f8f5ff] rounded-2xl py-10 px-5"
            >

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">


                    {/* JOBS */}

                    <motion.div
                        whileHover={{
                            scale: 1.05,
                        }}
                    >
                        <div className="text-3xl mb-2">
                            💼
                        </div>

                        <h3 className="text-3xl font-bold text-[#6A38C2]">
                            10K+
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                            Jobs Available
                        </p>
                    </motion.div>


                    {/* COMPANIES */}

                    <motion.div
                        whileHover={{
                            scale: 1.05,
                        }}
                    >
                        <div className="text-3xl mb-2">
                            🏢
                        </div>

                        <h3 className="text-3xl font-bold text-[#6A38C2]">
                            5K+
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                            Companies
                        </p>
                    </motion.div>


                    {/* SEEKERS */}

                    <motion.div
                        whileHover={{
                            scale: 1.05,
                        }}
                    >
                        <div className="text-3xl mb-2">
                            👥
                        </div>

                        <h3 className="text-3xl font-bold text-[#6A38C2]">
                            20K+
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                            Job Seekers
                        </p>
                    </motion.div>


                    {/* PARTNERS */}

                    <motion.div
                        whileHover={{
                            scale: 1.05,
                        }}
                    >
                        <div className="text-3xl mb-2">
                            🤝
                        </div>

                        <h3 className="text-3xl font-bold text-[#6A38C2]">
                            500+
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                            Hiring Partners
                        </p>
                    </motion.div>

                </div>

            </motion.section>


            {/* ====================================================== */}
            {/* ====================== CTA =========================== */}
            {/* ====================================================== */}

            <motion.section
                initial={{
                    opacity: 0,
                    scale: 0.97,
                }}
                whileInView={{
                    opacity: 1,
                    scale: 1,
                }}
                viewport={{
                    once: true,
                }}
                transition={{
                    duration: 0.6,
                }}
                className="relative overflow-hidden mt-12 rounded-2xl bg-gradient-to-r from-[#6A38C2] via-[#7546d8] to-[#8b5cf6] px-8 py-10 md:py-12"
            >

                {/* Background Decoration */}

                <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-white/10"></div>

                <div className="absolute -bottom-20 left-20 w-48 h-48 rounded-full bg-white/10"></div>


                <div className="relative flex flex-col md:flex-row items-center justify-between gap-7">

                    {/* Rocket Image/Icon */}

                    <motion.div
                        initial={{
                            opacity: 0,
                            x: -30,
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                        }}
                        viewport={{
                            once: true,
                        }}
                        transition={{
                            duration: 0.5,
                        }}
                        animate={{
                            y: [0, -8, 0],
                        }}
                    >
                        <div className="text-6xl md:text-7xl">
                            🚀
                        </div>
                    </motion.div>


                    {/* CTA TEXT */}

                    <div className="text-center md:text-left flex-1">

                        <h2 className="text-2xl md:text-3xl font-bold text-white">
                            Ready To Find Your Dream Job?
                        </h2>

                        <p className="text-white/90 mt-2 text-sm md:text-base">
                            Take the next step in your career today.
                        </p>

                    </div>


                    {/* CTA BUTTON */}

                    <motion.button
                        whileHover={{
                            scale: 1.05,
                        }}
                        whileTap={{
                            scale: 0.95,
                        }}
                        className="bg-white text-[#6A38C2] font-bold px-7 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                    >
                        Find Jobs Now
                        <span className="text-lg">
                            →
                        </span>
                    </motion.button>

                </div>

            </motion.section>

        </div>
    );
};

export default LatestJobs;