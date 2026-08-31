import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-gray-950 text-white mt-16">
            <div className="max-w-7xl mx-auto px-5 py-12">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

                    {/* About */}
                    <div>
                        <h2 className="text-3xl font-bold mb-4">
                            Job<span className="text-red-500"> Portal</span>
                        </h2>

                        <p className="text-gray-400 text-sm leading-6">
                            Find your dream job and connect with the best
                            companies. Explore thousands of opportunities and
                            build your career.
                        </p>

                        <div className="mt-5 space-y-2 text-sm text-gray-400">
                            <p>📧 anupamsingh@jobportal.com</p>
                            <p>📞 +91 72238 06163</p>
                            <p>📍 India</p>
                        </div>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Company
                        </h3>

                        <div className="space-y-3 text-sm text-gray-400">
                            <p className="hover:text-red-500 cursor-pointer">
                                About Us
                            </p>

                            <p className="hover:text-red-500 cursor-pointer">
                                Contact Us
                            </p>

                            <p className="hover:text-red-500 cursor-pointer">
                                Careers
                            </p>

                            <p className="hover:text-red-500 cursor-pointer">
                                Our Team
                            </p>
                        </div>
                    </div>

                    {/* Job Seekers */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            Job Seekers
                        </h3>

                        <div className="space-y-3 text-sm text-gray-400">
                            <p className="hover:text-red-500 cursor-pointer">
                                Browse Jobs
                            </p>

                            <p className="hover:text-red-500 cursor-pointer">
                                Job Categories
                            </p>

                            <p className="hover:text-red-500 cursor-pointer">
                                Create Resume
                            </p>

                            <p className="hover:text-red-500 cursor-pointer">
                                Career Advice
                            </p>
                        </div>
                    </div>

                    {/* Employers */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">
                            For Employers
                        </h3>

                        <div className="space-y-3 text-sm text-gray-400">
                            <p className="hover:text-red-500 cursor-pointer">
                                Post a Job
                            </p>

                            <p className="hover:text-red-500 cursor-pointer">
                                Find Candidates
                            </p>

                            <p className="hover:text-red-500 cursor-pointer">
                                Employer Login
                            </p>

                            <p className="hover:text-red-500 cursor-pointer">
                                Pricing
                            </p>
                        </div>
                    </div>

                </div>

                {/* Bottom */}
                <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between gap-4">

                    <p className="text-sm text-gray-500">
                        © 2026 Job<span className="text-red-500">Portal</span>.
                        All rights reserved.
                    </p>

                    <div className="flex gap-5 text-sm text-gray-500">
                        <span className="hover:text-red-500 cursor-pointer">
                            Privacy Policy
                        </span>

                        <span className="hover:text-red-500 cursor-pointer">
                            Terms & Conditions
                        </span>

                        <span className="hover:text-red-500 cursor-pointer">
                            Help Center
                        </span>
                    </div>

                </div>

            </div>
        </footer>
    )
}

export default Footer
