import React, { useState } from "react";
import {
    Search,
    Sparkles,
    UserPlus,
    FileText,
    SearchCheck,
    BriefcaseBusiness,
} from "lucide-react";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import femaleJob from "@/assets/female-job.png";

const HeroSection = () => {
    const [query, setQuery] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // =====================================================
    // SEARCH HANDLER
    // =====================================================

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    // =====================================================
    // CATEGORY HANDLER
    // =====================================================

    const categoryHandler = (category) => {
        dispatch(setSearchedQuery(category));
        navigate("/browse");
    };

    return (
        <section className="relative overflow-hidden bg-white">

            {/* =====================================================
                BACKGROUND
            ===================================================== */}

            <div className="absolute inset-0 pointer-events-none">

                <div className="absolute left-[-150px] top-[80px] w-[450px] h-[450px] rounded-full bg-purple-50 blur-3xl opacity-70"></div>

                <div className="absolute right-[-100px] top-[40px] w-[500px] h-[500px] rounded-full bg-blue-50 blur-3xl opacity-70"></div>

            </div>


            {/* =====================================================
                MAIN CONTAINER
            ===================================================== */}

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

                {/* =================================================
                    HERO MAIN
                ================================================= */}

                <div className="min-h-0 lg:min-h-[560px] flex flex-col lg:flex-row items-center">


                    {/* =================================================
                        LEFT CONTENT
                    ================================================= */}

                    <div className="w-full lg:w-[68%] text-center relative z-10 pt-10 sm:pt-14 lg:pt-0">

                        {/* =================================================
                            TOP BADGE
                        ================================================= */}

                        <motion.div
                            initial={{
                                opacity: 0,
                                y: -15,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.5,
                            }}
                            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full border border-purple-100 bg-purple-50/70 text-purple-600 text-xs sm:text-sm font-medium mb-6 sm:mb-8"
                        >

                            <Sparkles
                                size={16}
                            />

                            No.1 Job Hunt Website

                        </motion.div>


                        {/* =================================================
                            HEADING
                        ================================================= */}

                        <motion.h1
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.6,
                            }}
                            className="font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[68px] leading-[1.08] tracking-tight px-2"
                        >

                            Find Your{" "}

                            <span className="text-purple-600">
                                Dream Job
                            </span>

                            <br />

                            Build Your{" "}

                            <span className="text-orange-600">
                                Future
                            </span>

                        </motion.h1>


                        {/* =================================================
                            DESCRIPTION
                        ================================================= */}

                        <motion.p
                            initial={{
                                opacity: 0,
                                y: 15,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.6,
                                delay: 0.1,
                            }}
                            className="mt-6 sm:mt-8 text-gray-500 text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 max-w-3xl mx-auto px-4"
                        >

                            Discover thousands of opportunities from top
                            companies. Search for your perfect role, apply
                            with confidence, and take the next step in your
                            career.

                        </motion.p>


                        {/* =================================================
                            SEARCH BOX
                        ================================================= */}

                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.6,
                                delay: 0.2,
                            }}
                            className="mt-7 sm:mt-9 mx-auto w-full max-w-[780px] bg-white rounded-2xl sm:rounded-full shadow-xl border border-gray-100 p-2 flex flex-col sm:flex-row items-center gap-2"
                        >

                            {/* SEARCH INPUT AREA */}

                            <div className="w-full flex items-center">

                                {/* Search Icon */}

                                <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">

                                    <Search
                                        size={22}
                                        className="text-gray-500"
                                    />

                                </div>


                                {/* Input */}

                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) =>
                                        setQuery(e.target.value)
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            searchJobHandler();
                                        }
                                    }}
                                    placeholder="Search jobs, skills, companies..."
                                    className="flex-1 min-w-0 px-3 sm:px-5 outline-none text-gray-600 text-sm sm:text-base bg-transparent"
                                />

                            </div>


                            {/* Search Button */}

                            <Button
                                type="button"
                                onClick={searchJobHandler}
                                className="w-full sm:w-auto h-11 sm:h-12 px-7 sm:px-8 rounded-xl sm:rounded-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center gap-3"
                            >

                                Search

                                <Search
                                    size={18}
                                />

                            </Button>

                        </motion.div>


                        {/* =================================================
                            STATS
                        ================================================= */}

                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 15,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.6,
                                delay: 0.3,
                            }}
                            className="mt-7 sm:mt-8 flex justify-center items-center"
                        >

                            {/* JOBS */}

                            <div className="px-4 sm:px-8 md:px-10 text-center">

                                <h3 className="text-xl sm:text-2xl font-bold">
                                    10K+
                                </h3>

                                <p className="text-xs sm:text-sm text-gray-500">
                                    Jobs Available
                                </p>

                            </div>


                            <div className="h-10 sm:h-12 w-px bg-gray-200"></div>


                            {/* COMPANIES */}

                            <div className="px-4 sm:px-8 md:px-10 text-center">

                                <h3 className="text-xl sm:text-2xl font-bold">
                                    5K+
                                </h3>

                                <p className="text-xs sm:text-sm text-gray-500">
                                    Companies
                                </p>

                            </div>


                            <div className="h-10 sm:h-12 w-px bg-gray-200"></div>


                            {/* SEEKERS */}

                            <div className="px-4 sm:px-8 md:px-10 text-center">

                                <h3 className="text-xl sm:text-2xl font-bold">
                                    20K+
                                </h3>

                                <p className="text-xs sm:text-sm text-gray-500">
                                    Job Seekers
                                </p>

                            </div>

                        </motion.div>

                    </div>


                    {/* =====================================================
                        FEMALE IMAGE
                    ===================================================== */}

                    <div className="relative lg:absolute lg:right-[-20px] lg:top-[5px] w-full lg:w-[520px] h-[310px] sm:h-[390px] lg:h-[560px] flex items-end justify-center z-20 mt-8 lg:mt-0">


                        {/* =================================================
                            CIRCULAR BACKGROUND
                        ================================================= */}

                        <div className="absolute right-1/2 translate-x-1/2 lg:right-[20px] lg:translate-x-0 bottom-[20px] sm:bottom-[25px] lg:bottom-[45px] w-[250px] h-[250px] sm:w-[320px] sm:h-[320px] lg:w-[430px] lg:h-[430px] rounded-full border border-purple-100 bg-purple-50/40"></div>


                        <div className="absolute right-1/2 translate-x-1/2 lg:right-[55px] lg:translate-x-0 bottom-[45px] sm:bottom-[55px] lg:bottom-[80px] w-[210px] h-[210px] sm:w-[260px] sm:h-[260px] lg:w-[360px] lg:h-[360px] rounded-full border border-purple-100"></div>


                        <div className="absolute right-1/2 translate-x-1/2 lg:right-[90px] lg:translate-x-0 bottom-[70px] sm:bottom-[80px] lg:bottom-[115px] w-[170px] h-[170px] sm:w-[210px] sm:h-[210px] lg:w-[290px] lg:h-[290px] rounded-full border border-purple-100"></div>


                        {/* =================================================
                            250+ JOBS BADGE
                        ================================================= */}

                        <motion.div
                            initial={{
                                opacity: 0,
                                x: 30,
                                y: -15,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.7,
                                delay: 0.3,
                                ease: "easeOut",
                            }}
                            className="absolute left-2 sm:left-8 lg:left-[30px] top-4 sm:top-8 lg:top-[75px] z-30 bg-white rounded-2xl shadow-lg px-3 sm:px-5 py-3 sm:py-4 flex items-center gap-2 sm:gap-3"
                        >

                            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-purple-100 flex items-center justify-center">

                                <Sparkles
                                    size={20}
                                    className="text-purple-600 sm:hidden"
                                />

                                <Sparkles
                                    size={23}
                                    className="text-purple-600 hidden sm:block"
                                />

                            </div>


                            <div>

                                <p className="font-bold text-gray-900 text-xs sm:text-sm">
                                    250+ Jobs
                                </p>

                                <p className="text-gray-500 text-[10px] sm:text-xs">
                                    Posted Daily
                                </p>

                            </div>

                        </motion.div>


                        {/* =================================================
                            FEMALE PHOTO
                        ================================================= */}

                        <motion.img
                            src={femaleJob}
                            alt="Job seeker"
                            initial={{
                                opacity: 0,
                                x: 80,
                            }}
                            animate={{
                                opacity: 1,
                                x: 0,
                            }}
                            transition={{
                                duration: 0.9,
                                ease: "easeOut",
                            }}
                            className="relative z-20 w-[270px] h-[310px] sm:w-[350px] sm:h-[390px] lg:w-[500px] lg:h-[550px] object-contain object-bottom"
                        />

                    </div>

                </div>


                {/* =====================================================
                    CATEGORY ROW
                ===================================================== */}

                <div className="relative z-40 mt-6 lg:mt-[10px] pb-5">

                    <div className="flex items-center gap-3 sm:gap-5 lg:gap-8 overflow-x-auto px-2 sm:px-4 lg:pl-[250px] lg:-translate-x-[190px] scrollbar-hide">

                        {/* PREVIOUS */}

                        <button
                            type="button"
                            className="w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-50 cursor-pointer flex-shrink-0"
                        >
                            ‹
                        </button>


                        {/* FRONTEND */}

                        <button
                            type="button"
                            onClick={() =>
                                categoryHandler(
                                    "Frontend Developer"
                                )
                            }
                            className="px-5 sm:px-7 py-2.5 rounded-full border border-gray-400 bg-white font-medium text-xs sm:text-sm hover:bg-purple-50 hover:text-purple-700 hover:border-purple-400 cursor-pointer transition whitespace-nowrap flex-shrink-0"
                        >
                            Frontend Developer
                        </button>


                        {/* BACKEND */}

                        <button
                            type="button"
                            onClick={() =>
                                categoryHandler(
                                    "Backend Developer"
                                )
                            }
                            className="px-5 sm:px-7 py-2.5 rounded-full border border-gray-400 bg-white font-medium text-xs sm:text-sm hover:bg-purple-50 hover:text-purple-700 hover:border-purple-400 cursor-pointer transition whitespace-nowrap flex-shrink-0"
                        >
                            Backend Developer
                        </button>


                        {/* DATA SCIENCE */}

                        <button
                            type="button"
                            onClick={() =>
                                categoryHandler(
                                    "Data Science"
                                )
                            }
                            className="px-5 sm:px-7 py-2.5 rounded-full border border-gray-400 bg-white font-medium text-xs sm:text-sm hover:bg-purple-50 hover:text-purple-700 hover:border-purple-400 cursor-pointer transition whitespace-nowrap flex-shrink-0"
                        >
                            Data Science
                        </button>


                        {/* NEXT */}

                        <button
                            type="button"
                            className="w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-50 cursor-pointer flex-shrink-0"
                        >
                            ›
                        </button>

                    </div>

                </div>


                {/* =====================================================
                    HOW IT WORKS
                ===================================================== */}

                <div className="w-full pt-16 sm:pt-20 lg:pt-24 pb-14 sm:pb-20">

                    {/* HEADING */}

                    <div className="text-center mb-10 sm:mb-14">

                        <p className="text-gray-500 text-base sm:text-lg mb-3">
                            How it Works
                        </p>

                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#243858] leading-tight px-4">
                            Easy Steps To Get Your Dream Job
                            <br className="hidden sm:block" />
                            With Our Platform
                        </h2>

                    </div>


                    {/* FOUR STEPS */}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">


                        {/* =================================================
                            STEP 1
                        ================================================= */}

                        <div className="bg-[#fafcff] border border-gray-100 rounded-xl p-6 sm:p-7 min-h-[190px]">

                            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-5">

                                <UserPlus
                                    size={22}
                                    className="text-blue-500"
                                />

                            </div>

                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Create Account
                            </h3>

                            <p className="text-sm text-gray-500 leading-5">
                                Create your account and start exploring
                                thousands of exciting job opportunities.
                            </p>

                        </div>


                        {/* =================================================
                            STEP 2
                        ================================================= */}

                        <div className="bg-[#fafcff] border border-gray-100 rounded-xl p-6 sm:p-7 min-h-[190px]">

                            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-5">

                                <FileText
                                    size={22}
                                    className="text-blue-500"
                                />

                            </div>

                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Upload Your Resume
                            </h3>

                            <p className="text-sm text-gray-500 leading-5">
                                Upload your resume and let employers discover
                                your skills and experience.
                            </p>

                        </div>


                        {/* =================================================
                            STEP 3
                        ================================================= */}

                        <div className="bg-[#fafcff] border border-gray-100 rounded-xl p-6 sm:p-7 min-h-[190px]">

                            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-5">

                                <SearchCheck
                                    size={22}
                                    className="text-blue-500"
                                />

                            </div>

                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Search Job
                            </h3>

                            <p className="text-sm text-gray-500 leading-5">
                                Search and explore jobs that match your skills,
                                experience, and career goals.
                            </p>

                        </div>


                        {/* =================================================
                            STEP 4
                        ================================================= */}

                        <div className="bg-[#fafcff] border border-gray-100 rounded-xl p-6 sm:p-7 min-h-[190px]">

                            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-5">

                                <BriefcaseBusiness
                                    size={22}
                                    className="text-blue-500"
                                />

                            </div>

                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Apply Your Dream Job
                            </h3>

                            <p className="text-sm text-gray-500 leading-5">
                                Apply to your favorite jobs and take the next
                                step towards your dream career.
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default HeroSection;