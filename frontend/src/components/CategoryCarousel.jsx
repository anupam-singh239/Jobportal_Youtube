import React from "react";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "./ui/carousel";

import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

// ======================================================
// JOB CATEGORIES
// ======================================================

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "Full Stack Developer",
];

// ======================================================
// CATEGORY CAROUSEL
// ======================================================

const CategoryCarousel = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // ==================================================
    // CATEGORY CLICK HANDLER
    // ==================================================

    const searchJobHandler = (selectedCategory) => {

        console.log("Selected Category:", selectedCategory);

        // Save selected category in Redux
        dispatch(setSearchedQuery(selectedCategory));

        // Go to Browse page
        navigate("/browse");
    };

    return (
        <div className="w-full">

            <Carousel
                opts={{
                    align: "center",
                    loop: false,
                }}
                className="
                    w-full
                    max-w-4xl
                    mx-auto
                    mt-6
                    mb-10
                    -translate-x-[5cm]
                    translate-y-[2cm]
                "
            >

                {/* ==========================================
                    CAROUSEL CONTENT
                ========================================== */}

                <CarouselContent className="flex items-center">

                    {category.map((item, index) => (

                        <CarouselItem
                            key={index}
                            className="
                                basis-auto
                                flex
                                justify-center
                                px-2
                            "
                        >

                            <Button
                                type="button"
                                variant="outline"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    searchJobHandler(item);
                                }}
                                className="
                                    h-12
                                    px-7
                                    rounded-full
                                    whitespace-nowrap
                                    border-gray-300
                                    bg-white
                                    text-black
                                    font-medium
                                    hover:bg-purple-50
                                    hover:text-[#6A38C2]
                                    hover:border-[#6A38C2]
                                    transition-all
                                    duration-200
                                    cursor-pointer
                                "
                            >
                                {item}
                            </Button>

                        </CarouselItem>

                    ))}

                </CarouselContent>

                {/* ==========================================
                    PREVIOUS BUTTON
                ========================================== */}

                <CarouselPrevious
                    type="button"
                    className="
                        left-0
                        z-20
                        bg-white
                        border-gray-300
                        hover:bg-purple-50
                        cursor-pointer
                    "
                />

                {/* ==========================================
                    NEXT BUTTON
                ========================================== */}

                <CarouselNext
                    type="button"
                    className="
                        right-0
                        z-20
                        bg-white
                        border-gray-300
                        hover:bg-purple-50
                        cursor-pointer
                    "
                />

            </Carousel>

        </div>
    );
};

export default CategoryCarousel;