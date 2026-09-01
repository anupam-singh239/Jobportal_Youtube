import React, { useState } from "react";

const filterData = [
    {
        filterType: "Location",
        array: [
            "Delhi NCR",
            "Bangalore",
            "Hyderabad",
            "Pune",
            "Mumbai",
            "Indore",
            "Bhopal",
        ],
    },
    {
        filterType: "Industry",
        array: [
            "Frontend Developer",
            "Backend Developer",
            "Full Stack Developer",
            "Data Science",
            "Graphic Designer",
        ],
    },
    {
        filterType: "Salary",
        array: [
            "0-2 LPA",
            "2-5 LPA",
            "5-10 LPA",
            "10-20 LPA",
            "20+ LPA",
        ],
    },
];

const FilterCard = ({ onFilterChange }) => {

    const [selectedFilters, setSelectedFilters] = useState({
        Location: "",
        Industry: "",
        Salary: "",
    });

    const changeHandler = (filterType, value) => {

        const updatedFilters = {
            ...selectedFilters,
            [filterType]: value,
        };

        setSelectedFilters(updatedFilters);

        if (onFilterChange) {
            onFilterChange(updatedFilters);
        }
    };

    const clearFilters = () => {

        const emptyFilters = {
            Location: "",
            Industry: "",
            Salary: "",
        };

        setSelectedFilters(emptyFilters);

        if (onFilterChange) {
            onFilterChange(emptyFilters);
        }
    };

    return (
        <div className="w-full bg-white p-4 rounded-xl shadow-md border border-gray-100">

            {/* ================= HEADER ================= */}

            <div className="flex items-center justify-between">

                <h1 className="font-bold text-lg">
                    Filter Jobs
                </h1>

                <button
                    type="button"
                    onClick={clearFilters}
                    className="text-sm text-[#7209B7] hover:underline cursor-pointer"
                >
                    Clear
                </button>

            </div>


            <hr className="mt-3 mb-4" />


            {/* ================= FILTERS ================= */}

            {filterData.map((data, index) => (

                <div
                    key={index}
                    className="mb-6"
                >

                    <h2 className="font-bold text-md mb-3">
                        {data.filterType}
                    </h2>


                    <div className="space-y-2">

                        {data.array.map(
                            (item, itemIndex) => {

                                const radioId =
                                    `${data.filterType}-${itemIndex}`;

                                return (
                                    <div
                                        key={itemIndex}
                                        className="flex items-center gap-2"
                                    >

                                        <input
                                            type="radio"
                                            id={radioId}
                                            name={data.filterType}
                                            value={item}
                                            checked={
                                                selectedFilters[
                                                    data.filterType
                                                ] === item
                                            }
                                            onChange={() =>
                                                changeHandler(
                                                    data.filterType,
                                                    item
                                                )
                                            }
                                            className="w-4 h-4 accent-[#7209B7] cursor-pointer"
                                        />


                                        <label
                                            htmlFor={radioId}
                                            className="text-sm text-gray-700 cursor-pointer hover:text-[#7209B7]"
                                        >
                                            {item}
                                        </label>

                                    </div>
                                );
                            }
                        )}

                    </div>

                </div>

            ))}

        </div>
    );
};

export default FilterCard;