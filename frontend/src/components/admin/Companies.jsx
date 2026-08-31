import React, { useEffect, useState } from "react";
import Navbar from "../ui/shared/Navbar";
import { Button } from "@base-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setCompanies } from "@/redux/companySlice";
import CompaniesTable from "./CompaniesTable";
import toast from "react-hot-toast";

const Companies = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Search input
    const [input, setInput] = useState("");

    // Companies Redux se
    const { companies = [] } = useSelector(
        (store) => store.company
    );

    // =====================================================
    // FETCH COMPANIES
    // =====================================================

    useEffect(() => {

        const fetchCompanies = async () => {

            try {

                const res = await axios.get(
                    `${COMPANY_API_END_POINT}/get`,
                    {
                        withCredentials: true,
                    }
                );

                console.log(
                    "COMPANIES RESPONSE:",
                    res.data
                );

                if (res.data?.success) {

                    dispatch(
                        setCompanies(
                            res.data.companies || []
                        )
                    );

                }

            } catch (error) {

                console.log(
                    "Fetch Companies Error:",
                    error
                );

                toast.error(
                    error?.response?.data?.message ||
                    "Failed to fetch companies"
                );

            }

        };

        fetchCompanies();

    }, [dispatch]);


    // =====================================================
    // FILTER COMPANIES
    // =====================================================

    const filteredCompanies = companies.filter(
        (company) =>
            company.name
                ?.toLowerCase()
                .includes(
                    input.toLowerCase().trim()
                )
    );


    return (
        <div>

            <Navbar />

            <div className="max-w-6xl mx-auto my-10 px-4">

                {/* =================================================
                    SEARCH + NEW COMPANY
                ================================================= */}

                <div className="flex items-center justify-between my-5">

                    <input
                        type="text"
                        value={input}
                        placeholder="Filter by name"
                        onChange={(e) =>
                            setInput(e.target.value)
                        }
                        className="w-64 border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-black"
                    />

                    <Button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/admin/companies/create"
                            )
                        }
                        className="bg-black text-white px-5 py-3 rounded-md hover:bg-gray-800"
                    >
                        New Company
                    </Button>

                </div>


                {/* =================================================
                    COMPANY TABLE
                ================================================= */}

                <CompaniesTable
                    companies={filteredCompanies}
                    searchText={input}
                />

            </div>

        </div>
    );
};

export default Companies;