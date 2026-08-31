import React, { useState } from "react";
import Navbar from "../ui/shared/Navbar";
import { Button } from "@base-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

const CompanyCreate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [companyName, setCompanyName] = useState("");

    // ================= CREATE COMPANY =================
    const registerNewCompany = async () => {
        try {
            // Validation
            if (!companyName.trim()) {
                toast.error("Please enter company name");
                return;
            }

            const res = await axios.post(
                `${COMPANY_API_END_POINT}/register`,
                {
                    companyName: companyName.trim(),
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            if (res.data?.success) {
                // Redux me company save
                dispatch(
                    setSingleCompany(res.data.company)
                );

                // Success message
                toast.success(
                    res.data.message ||
                    "Company created successfully"
                );

                // Company ID
                const companyId =
                    res.data?.company?._id;

                // Company details page
                if (companyId) {
                    navigate(
                        `/admin/companies/${companyId}`
                    );
                } else {
                    navigate("/admin/companies");
                }
            }

        } catch (error) {
            console.log(
                "Register Company Error:",
                error
            );

            toast.error(
                error?.response?.data?.message ||
                "Failed to create company"
            );
        }
    };

    return (
        <div>
            {/* ================= NAVBAR ================= */}
            <Navbar />

            {/* ================= MAIN ================= */}
            <div className="max-w-4xl mx-auto px-4">

                <div className="my-10">

                    <h1 className="font-bold text-2xl">
                        Your Company Name
                    </h1>

                    <p className="text-gray-500 mt-2">
                        What would you like to give your
                        company name? You can change this
                        later.
                    </p>

                </div>

                {/* ================= LABEL ================= */}
                <label
                    htmlFor="companyName"
                    className="block font-medium mb-2"
                >
                    Company Name
                </label>

                {/* ================= INPUT ================= */}
                <input
                    id="companyName"
                    type="text"
                    value={companyName}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="JobHunt, Microsoft etc.."
                    onChange={(e) =>
                        setCompanyName(e.target.value)
                    }
                />

                {/* ================= BUTTONS ================= */}
                <div className="flex items-center gap-2 my-10">

                    {/* Cancel */}
                    <Button
                        variant="outline"
                        onClick={() =>
                            navigate("/admin/companies")
                        }
                    >
                        Cancel
                    </Button>

                    {/* Continue */}
                    <Button
                        onClick={registerNewCompany}
                        className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800"
                    >
                        Continue
                    </Button>

                </div>

            </div>
        </div>
    );
};

export default CompanyCreate;