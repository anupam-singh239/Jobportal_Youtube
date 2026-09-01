import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const LatestJobs = () => {

    const { allJobs = [] } = useSelector(
        (store) => store.job
    );


    return (

        <div className="
            max-w-7xl
            mx-auto
            my-12
            sm:my-20
            px-4
            sm:px-6
            lg:px-8
            overflow-hidden
        ">

            {/* =====================================
                HEADING
            ===================================== */}

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

                className="
                    text-2xl
                    sm:text-3xl
                    md:text-4xl
                    font-bold
                    leading-tight
                "
            >

                <span className="text-[#6A38C2]">
                    Latest & Top
                </span>

                {" "}

                Job Openings

            </motion.h1>


            {/* =====================================
                JOB CARDS
            ===================================== */}

            <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3
                gap-4
                sm:gap-5
                my-5
            ">

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

                                className="w-full min-w-0"
                            >

                                <LatestJobCards
                                    job={job}
                                />

                            </motion.div>

                        ))
                )}

            </div>


            {/* =====================================
                COMPANIES SECTION
            ===================================== */}

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

                className="
                    w-full
                    bg-[#fffaf8]
                    rounded-xl
                    sm:rounded-2xl
                    py-8
                    sm:py-12
                    px-4
                    sm:px-5
                    mt-12
                    sm:mt-16
                "
            >

                {/* TITLE */}

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

                    className="text-center mb-8 sm:mb-10"
                >

                    <h2 className="
                        text-lg
                        sm:text-xl
                        md:text-2xl
                        font-bold
                        text-gray-800
                        leading-7
                    ">

                        Work With Exciting 100+

                        <span className="text-sky-400 ml-2">
                            Companies
                        </span>

                        {" "}

                        In The World

                    </h2>

                </motion.div>


                {/* TESTIMONIALS */}

                <div className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-5
                    gap-4
                ">

                    {/* TESTIMONIAL 1 */}

                    <Testimonial
                        image="https://i.pravatar.cc/100?img=47"
                        name="Sarah Johnson"
                        company="Google"
                        delay={0.1}
                        text="We found talented professionals quickly and easily. The hiring experience was smooth and efficient."
                    />


                    {/* TESTIMONIAL 2 */}

                    <Testimonial
                        image="https://i.pravatar.cc/100?img=12"
                        name="Michael Smith"
                        company="Microsoft"
                        delay={0.2}
                        text="This platform helped us connect with skilled candidates who were the perfect fit for our growing team."
                    />


                    {/* TESTIMONIAL 3 */}

                    <Testimonial
                        image="https://i.pravatar.cc/100?img=11"
                        name="Alex Morgan"
                        company="Amazon"
                        delay={0.3}
                        text="A simple and powerful way to discover great talent. It has made our recruitment process much faster."
                    />


                    {/* TESTIMONIAL 4 */}

                    <Testimonial
                        image="https://i.pravatar.cc/100?img=44"
                        name="Emily Davis"
                        company="Adobe"
                        delay={0.4}
                        text="The quality of candidates is impressive. We were able to build our team with confidence."
                    />


                    {/* TESTIMONIAL 5 */}

                    <Testimonial
                        image="https://i.pravatar.cc/100?img=68"
                        name="James Wilson"
                        company="HubSpot"
                        delay={0.5}
                        text="An excellent platform for finding the right people. The entire hiring journey feels simple and professional."
                    />

                </div>


                {/* COMPANY LOGOS */}

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

                    className="
                        flex
                        flex-wrap
                        items-center
                        justify-center
                        gap-x-8
                        sm:gap-x-12
                        gap-y-6
                        sm:gap-y-8
                        mt-10
                        sm:mt-12
                    "
                >

                    <CompanyLogo
                        icon="G"
                        name="Google"
                        iconClass="text-blue-500"
                    />

                    <CompanyLogo
                        icon="▦"
                        name="Microsoft"
                        iconClass="text-blue-500"
                    />

                    <CompanyLogo
                        icon="a"
                        name="Amazon"
                        iconClass="bg-black text-white"
                    />

                    <CompanyLogo
                        icon="●"
                        name="Apple"
                        iconClass="text-gray-700"
                    />

                    <CompanyLogo
                        icon="∞"
                        name="Meta"
                        iconClass="text-blue-500"
                    />

                    <CompanyLogo
                        icon="A"
                        name="Adobe"
                        iconClass="bg-red-50 text-red-600"
                    />

                    <CompanyLogo
                        icon="N"
                        name="Netflix"
                        iconClass="text-red-600"
                    />

                    <CompanyLogo
                        icon="$"
                        name="Shopify"
                        iconClass="bg-green-50 text-green-600"
                    />

                    <CompanyLogo
                        icon="✣"
                        name="Slack"
                        iconClass="text-purple-500"
                    />

                    <CompanyLogo
                        icon="H"
                        name="HubSpot"
                        iconClass="bg-orange-50 text-orange-500"
                    />

                </motion.div>

            </motion.section>


            {/* =====================================
                WHY CHOOSE
            ===================================== */}

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

                className="
                    py-12
                    sm:py-16
                "
            >

                <div className="text-center mb-8 sm:mb-10">

                    <h2 className="
                        text-2xl
                        sm:text-3xl
                        md:text-4xl
                        font-bold
                        text-gray-900
                    ">

                        Why Choose{" "}

                        <span className="text-[#6A38C2]">
                            Job Portal?
                        </span>

                    </h2>


                    <p className="
                        text-gray-500
                        mt-3
                        text-sm
                        sm:text-base
                        px-3
                    ">
                        Everything you need to find your next opportunity.
                    </p>

                </div>


                <div className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-4
                    gap-4
                    sm:gap-6
                ">

                    <WhyCard
                        icon="⚡"
                        title="Fast Job Search"
                        text="Find relevant jobs quickly with our smart and simple search experience."
                    />

                    <WhyCard
                        icon="🛡️"
                        title="Trusted Companies"
                        text="Connect with verified and trusted employers from different industries."
                    />

                    <WhyCard
                        icon="🎯"
                        title="Better Opportunities"
                        text="Discover jobs that match your skills, experience and career goals."
                    />

                    <WhyCard
                        icon="📄"
                        title="Easy Applications"
                        text="Apply to your dream jobs in just a few clicks without any hassle."
                    />

                </div>

            </motion.section>


            {/* =====================================
                STATS
            ===================================== */}

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

                className="
                    bg-[#f8f5ff]
                    rounded-xl
                    sm:rounded-2xl
                    py-8
                    sm:py-10
                    px-4
                    sm:px-5
                "
            >

                <div className="
                    grid
                    grid-cols-2
                    md:grid-cols-4
                    gap-y-8
                    gap-x-4
                    text-center
                ">

                    <Stat
                        icon="💼"
                        number="10K+"
                        text="Jobs Available"
                    />

                    <Stat
                        icon="🏢"
                        number="5K+"
                        text="Companies"
                    />

                    <Stat
                        icon="👥"
                        number="20K+"
                        text="Job Seekers"
                    />

                    <Stat
                        icon="🤝"
                        number="500+"
                        text="Hiring Partners"
                    />

                </div>

            </motion.section>


            {/* =====================================
                CTA
            ===================================== */}

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

                className="
                    relative
                    overflow-hidden
                    mt-8
                    sm:mt-12
                    rounded-xl
                    sm:rounded-2xl
                    bg-gradient-to-r
                    from-[#6A38C2]
                    via-[#7546d8]
                    to-[#8b5cf6]
                    px-5
                    sm:px-8
                    py-8
                    sm:py-10
                    md:py-12
                "
            >

                {/* DECORATION */}

                <div className="
                    absolute
                    -top-16
                    -right-16
                    w-40
                    h-40
                    rounded-full
                    bg-white/10
                " />

                <div className="
                    absolute
                    -bottom-20
                    left-20
                    w-48
                    h-48
                    rounded-full
                    bg-white/10
                " />


                <div className="
                    relative
                    flex
                    flex-col
                    md:flex-row
                    items-center
                    justify-between
                    gap-6
                    md:gap-7
                ">

                    {/* ROCKET */}

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

                        <div className="
                            text-5xl
                            sm:text-6xl
                            md:text-7xl
                        ">
                            🚀
                        </div>

                    </motion.div>


                    {/* TEXT */}

                    <div className="
                        text-center
                        md:text-left
                        flex-1
                    ">

                        <h2 className="
                            text-xl
                            sm:text-2xl
                            md:text-3xl
                            font-bold
                            text-white
                        ">
                            Ready To Find Your Dream Job?
                        </h2>

                        <p className="
                            text-white/90
                            mt-2
                            text-sm
                            md:text-base
                        ">
                            Take the next step in your career today.
                        </p>

                    </div>


                    {/* BUTTON */}

                    <motion.button

                        whileHover={{
                            scale: 1.05,
                        }}

                        whileTap={{
                            scale: 0.95,
                        }}

                        className="
                            w-full
                            md:w-auto
                            bg-white
                            text-[#6A38C2]
                            font-bold
                            px-7
                            py-3
                            rounded-xl
                            shadow-lg
                            hover:shadow-xl
                            transition-all
                            flex
                            items-center
                            justify-center
                            gap-2
                        "
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


/* =====================================================
   TESTIMONIAL COMPONENT
===================================================== */

const Testimonial = ({
    image,
    name,
    company,
    text,
    delay,
}) => {

    return (

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
                delay,
            }}

            whileHover={{
                y: -6,
            }}

            className="
                bg-white
                rounded-2xl
                p-4
                sm:p-5
                border
                border-gray-100
                shadow-sm
                hover:shadow-lg
                transition-all
                duration-300
            "
        >

            <div className="
                flex
                items-center
                gap-3
                mb-4
            ">

                <img
                    src={image}
                    alt={name}
                    className="
                        w-11
                        h-11
                        sm:w-12
                        sm:h-12
                        rounded-full
                        object-cover
                        flex-shrink-0
                    "
                />

                <div className="min-w-0">

                    <h3 className="
                        font-bold
                        text-gray-800
                        text-sm
                        truncate
                    ">
                        {name}
                    </h3>

                    <p className="
                        text-xs
                        text-gray-400
                    ">
                        {company}
                    </p>

                </div>

            </div>


            <div className="
                text-yellow-400
                text-sm
                mb-3
            ">
                ★★★★★
            </div>


            <p className="
                text-sm
                text-gray-500
                leading-6
            ">
                "{text}"
            </p>

        </motion.div>
    );
};


/* =====================================================
   COMPANY LOGO
===================================================== */

const CompanyLogo = ({
    icon,
    name,
    iconClass,
}) => {

    return (

        <motion.div

            whileHover={{
                scale: 1.08,
            }}

            className="
                flex
                items-center
                gap-2
                flex-shrink-0
            "
        >

            <div className={`
                w-8
                h-8
                rounded-md
                flex
                items-center
                justify-center
                text-xl
                font-bold
                ${iconClass}
            `}>
                {icon}
            </div>

            <span className="
                text-base
                sm:text-lg
                font-semibold
                text-gray-600
            ">
                {name}
            </span>

        </motion.div>
    );
};


/* =====================================================
   WHY CARD
===================================================== */

const WhyCard = ({
    icon,
    title,
    text,
}) => {

    return (

        <motion.div

            whileHover={{
                y: -7,
            }}

            className="
                text-center
                p-5
                sm:p-7
                rounded-2xl
                border
                border-gray-100
                bg-white
                shadow-sm
                hover:shadow-lg
                transition-all
            "
        >

            <div className="
                w-14
                h-14
                sm:w-16
                sm:h-16
                mx-auto
                rounded-full
                bg-purple-100
                flex
                items-center
                justify-center
                mb-5
            ">

                <span className="
                    text-2xl
                    sm:text-3xl
                    text-[#6A38C2]
                ">
                    {icon}
                </span>

            </div>


            <h3 className="
                text-lg
                font-bold
                text-gray-800
            ">
                {title}
            </h3>


            <p className="
                text-sm
                text-gray-500
                mt-2
                leading-6
            ">
                {text}
            </p>

        </motion.div>
    );
};


/* =====================================================
   STAT
===================================================== */

const Stat = ({
    icon,
    number,
    text,
}) => {

    return (

        <motion.div
            whileHover={{
                scale: 1.05,
            }}
        >

            <div className="
                text-2xl
                sm:text-3xl
                mb-2
            ">
                {icon}
            </div>


            <h3 className="
                text-2xl
                sm:text-3xl
                font-bold
                text-[#6A38C2]
            ">
                {number}
            </h3>


            <p className="
                text-xs
                sm:text-sm
                text-gray-500
                mt-1
            ">
                {text}
            </p>

        </motion.div>
    );
};


export default LatestJobs;