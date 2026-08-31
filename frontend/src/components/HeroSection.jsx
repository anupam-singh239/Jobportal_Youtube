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

  // ================= SEARCH HANDLER =================

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  // ================= CATEGORY HANDLER =================

  const categoryHandler = (category) => {
    dispatch(setSearchedQuery(category));
    navigate("/browse");
  };

  return (
    <section className="relative overflow-hidden bg-white">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">

        <div className="absolute left-[-150px] top-[80px] w-[450px] h-[450px] rounded-full bg-purple-50 blur-3xl opacity-70"></div>

        <div className="absolute right-[-100px] top-[40px] w-[500px] h-[500px] rounded-full bg-blue-50 blur-3xl opacity-70"></div>

      </div>

      {/* Main Container */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">

        <div className="min-h-[560px] flex items-center">

          {/* ================= LEFT CONTENT ================= */}

          <div className="w-full lg:w-[68%] text-center relative z-10">

            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-purple-100 bg-purple-50/70 text-purple-600 text-sm font-medium mb-8"
            >
              <Sparkles size={17} />

              No.1 Job Hunt Website
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-extrabold text-5xl md:text-6xl lg:text-[68px] leading-[1.08] tracking-tight"
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

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-8 text-gray-500 text-lg leading-7 max-w-3xl mx-auto"
            >
              Discover thousands of opportunities from top companies.
              Search for your perfect role, apply with confidence,
              and take the next step in your career.
            </motion.p>

            {/* Search Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-9 mx-auto w-full max-w-[780px] bg-white rounded-full shadow-xl border border-gray-100 p-2 flex items-center"
            >

              {/* Search Icon */}
              <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">

                <Search
                  size={25}
                  className="text-gray-500"
                />

              </div>

              {/* Input */}
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    searchJobHandler();
                  }
                }}
                placeholder="Search jobs, skills, companies..."
                className="flex-1 px-5 outline-none text-gray-600 text-base bg-transparent"
              />

              {/* Search Button */}
              <Button
                type="button"
                onClick={searchJobHandler}
                className="h-12 px-8 rounded-full bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-3"
              >
                Search

                <Search size={18} />
              </Button>

            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.3,
              }}
              className="mt-8 flex justify-center items-center"
            >

              <div className="px-10 text-center">

                <h3 className="text-2xl font-bold">
                  10K+
                </h3>

                <p className="text-sm text-gray-500">
                  Jobs Available
                </p>

              </div>

              <div className="h-12 w-px bg-gray-200"></div>

              <div className="px-10 text-center">

                <h3 className="text-2xl font-bold">
                  5K+
                </h3>

                <p className="text-sm text-gray-500">
                  Companies
                </p>

              </div>

              <div className="h-12 w-px bg-gray-200"></div>

              <div className="px-10 text-center">

                <h3 className="text-2xl font-bold">
                  20K+
                </h3>

                <p className="text-sm text-gray-500">
                  Job Seekers
                </p>

              </div>

            </motion.div>

          </div>

          {/* ================= RIGHT FEMALE IMAGE ================= */}

          <div className="absolute right-[-20px] top-[5px] w-[520px] h-[560px] hidden lg:flex items-end justify-center z-20">

            {/* Circular Background */}
            <div className="absolute right-[20px] bottom-[45px] w-[430px] h-[430px] rounded-full border border-purple-100 bg-purple-50/40"></div>

            <div className="absolute right-[55px] bottom-[80px] w-[360px] h-[360px] rounded-full border border-purple-100"></div>

            <div className="absolute right-[90px] bottom-[115px] w-[290px] h-[290px] rounded-full border border-purple-100"></div>

            {/* 250+ Jobs Badge */}
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
              className="absolute left-[30px] top-[75px] z-30 bg-white rounded-2xl shadow-lg px-5 py-4 flex items-center gap-3"
            >

              <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center">

                <Sparkles
                  size={23}
                  className="text-purple-600"
                />

              </div>

              <div>

                <p className="font-bold text-gray-900 text-sm">
                  250+ Jobs
                </p>

                <p className="text-gray-500 text-xs">
                  Posted Daily
                </p>

              </div>

            </motion.div>

            {/* Female Image */}
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
              className="relative z-20 w-[500px] h-[550px] object-contain object-bottom"
            />

          </div>

        </div>

        {/* ================= CATEGORY ROW ================= */}

        <div className="relative z-40 mt-[10px] pb-5 flex justify-start pl-[250px] items-center gap-8 -translate-x-[190px]">

          {/* Previous */}
          <button
            type="button"
            className="w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-50 cursor-pointer"
          >
            ‹
          </button>

          {/* Frontend Developer */}
          <button
            type="button"
            onClick={() =>
              categoryHandler("Frontend Developer")
            }
            className="px-7 py-2.5 rounded-full border border-gray-400 bg-white font-medium text-sm hover:bg-purple-50 hover:text-purple-700 hover:border-purple-400 cursor-pointer transition"
          >
            Frontend Developer
          </button>

          {/* Backend Developer */}
          <button
            type="button"
            onClick={() =>
              categoryHandler("Backend Developer")
            }
            className="px-7 py-2.5 rounded-full border border-gray-400 bg-white font-medium text-sm hover:bg-purple-50 hover:text-purple-700 hover:border-purple-400 cursor-pointer transition"
          >
            Backend Developer
          </button>

          {/* Data Science */}
          <button
            type="button"
            onClick={() =>
              categoryHandler("Data Science")
            }
            className="px-7 py-2.5 rounded-full border border-gray-400 bg-white font-medium text-sm hover:bg-purple-50 hover:text-purple-700 hover:border-purple-400 cursor-pointer transition"
          >
            Data Science
          </button>

          {/* Next */}
          <button
            type="button"
            className="w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-50 cursor-pointer"
          >
            ›
          </button>

        </div>


        {/* ===================================================== */}
        {/* ================= HOW IT WORKS ====================== */}
        {/* ===================================================== */}

        <div className="w-full pt-24 pb-20">

          {/* Heading */}
          <div className="text-center mb-14">

            <p className="text-gray-500 text-lg mb-3">
              How it Works
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-[#243858] leading-tight">
              Easy Steps To Get Your Dream Job
              <br />
              With Our Platform
            </h2>

          </div>


          {/* Four Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* ================= STEP 1 ================= */}

            <div className="bg-[#fafcff] border border-gray-100 rounded-xl p-7 min-h-[190px]">

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
                Create your account and start exploring thousands
                of exciting job opportunities.
              </p>

            </div>


            {/* ================= STEP 2 ================= */}

            <div className="bg-[#fafcff] border border-gray-100 rounded-xl p-7 min-h-[190px]">

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
                Upload your resume and let employers discover your
                skills and experience.
              </p>

            </div>


            {/* ================= STEP 3 ================= */}

            <div className="bg-[#fafcff] border border-gray-100 rounded-xl p-7 min-h-[190px]">

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


            {/* ================= STEP 4 ================= */}

            <div className="bg-[#fafcff] border border-gray-100 rounded-xl p-7 min-h-[190px]">

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
                Apply to your favorite jobs and take the next step
                towards your dream career.
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>

  );
};

export default HeroSection;