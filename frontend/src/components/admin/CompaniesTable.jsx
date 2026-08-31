import React, { useState } from "react";
import {
    MoreHorizontal,
    Edit2,
    Trash2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useDispatch } from "react-redux";
import { setCompanies } from "@/redux/companySlice";

const CompaniesTable = ({
    companies = [],
    searchText = "",
}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [openAction, setOpenAction] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    // =====================================================
    // DELETE COMPANY
    // =====================================================

    const deleteCompanyHandler = async (companyId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this company?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            setDeletingId(companyId);

            const res = await axios.delete(
                `${COMPANY_API_END_POINT}/delete/${companyId}`,
                {
                    withCredentials: true,
                }
            );

            console.log("DELETE RESPONSE:", res.data);

            if (res.data?.success) {
                toast.success(
                    res.data.message ||
                        "Company deleted successfully"
                );

                // =========================================
                // GET UPDATED COMPANIES
                // =========================================

                const companyRes = await axios.get(
                    `${COMPANY_API_END_POINT}/get`,
                    {
                        withCredentials: true,
                    }
                );

                if (companyRes.data?.success) {
                    dispatch(
                        setCompanies(
                            companyRes.data.companies || []
                        )
                    );
                }

                setOpenAction(null);
            }
        } catch (error) {
            console.error(
                "Delete Company Error:",
                error
            );

            toast.error(
                error?.response?.data?.message ||
                    "Failed to delete company"
            );
        } finally {
            setDeletingId(null);
        }
    };

    // =====================================================
    // LOGO ERROR HANDLER
    // =====================================================

    const handleLogoError = (e) => {
        e.currentTarget.onerror = null;

        // Public folder ke andar default-company-logo.png
        e.currentTarget.src =
            "/default-company-logo.png";
    };

    // =====================================================
    // UI
    // =====================================================

    return (
        <div className="w-full">

            <div className="border rounded-lg bg-white overflow-visible">

                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="grid grid-cols-4 bg-gray-100 border-b p-4 font-semibold">

                    <div>
                        Logo
                    </div>

                    <div>
                        Name
                    </div>

                    <div>
                        Date
                    </div>

                    <div className="text-right">
                        Action
                    </div>

                </div>

                {/* =================================================
                    NO COMPANIES
                ================================================= */}

                {companies.length === 0 ? (

                    <div className="p-10 text-center text-gray-500">

                        {searchText.trim() ? (
                            <>
                                <p className="font-medium text-lg">
                                    No company found
                                </p>

                                <p className="text-sm mt-1">
                                    No company matches "
                                    {searchText}
                                    "
                                </p>
                            </>
                        ) : (
                            <p>
                                You haven't registered any
                                company yet.
                            </p>
                        )}

                    </div>

                ) : (

                    /* =================================================
                       COMPANY LIST
                    ================================================= */

                    companies.map((company) => (

                        <div
                            key={company._id}
                            className="
                                grid
                                grid-cols-4
                                items-center
                                p-4
                                border-b
                                last:border-b-0
                            "
                        >

                            {/* =================================================
                                LOGO
                            ================================================= */}

                            <div>

                                <img
                                    src={
                                        company?.logo &&
                                        company.logo.trim() !== ""
                                            ? company.logo
                                            : "/default-company-logo.png"
                                    }
                                    alt={
                                        company?.name
                                            ? `${company.name} Logo`
                                            : "Company Logo"
                                    }
                                    className="
                                        w-12
                                        h-12
                                        rounded-full
                                        object-cover
                                        border
                                        border-gray-200
                                        bg-gray-100
                                    "
                                    onError={
                                        handleLogoError
                                    }
                                />

                            </div>

                            {/* =================================================
                                COMPANY NAME
                            ================================================= */}

                            <div className="font-medium">

                                {company?.name || "N/A"}

                            </div>

                            {/* =================================================
                                DATE
                            ================================================= */}

                            <div className="text-gray-600">

                                {company?.createdAt
                                    ? new Date(
                                        company.createdAt
                                    ).toLocaleDateString(
                                        "en-IN"
                                    )
                                    : "N/A"}

                            </div>

                            {/* =================================================
                                ACTION
                            ================================================= */}

                            <div className="flex justify-end">

                                <div className="relative">

                                    {/* =================================================
                                        THREE DOT BUTTON
                                    ================================================= */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setOpenAction(
                                                openAction ===
                                                    company._id
                                                    ? null
                                                    : company._id
                                            )
                                        }
                                        className="
                                            p-2
                                            rounded-md
                                            hover:bg-gray-200
                                            cursor-pointer
                                        "
                                    >

                                        <MoreHorizontal
                                            className="w-5 h-5"
                                        />

                                    </button>

                                    {/* =================================================
                                        DROPDOWN
                                    ================================================= */}

                                    {openAction ===
                                        company._id && (

                                        <div
                                            className="
                                                absolute
                                                right-0
                                                top-full
                                                mt-1
                                                w-36
                                                bg-white
                                                border
                                                border-gray-200
                                                rounded-md
                                                shadow-xl
                                                z-[9999]
                                            "
                                        >

                                            {/* =================================================
                                                EDIT
                                            ================================================= */}

                                            <button
                                                type="button"
                                                onClick={() => {

                                                    setOpenAction(
                                                        null
                                                    );

                                                    navigate(
                                                        `/admin/companies/${company._id}`
                                                    );
                                                }}
                                                className="
                                                    flex
                                                    items-center
                                                    gap-2
                                                    w-full
                                                    px-4
                                                    py-3
                                                    text-sm
                                                    hover:bg-gray-100
                                                    cursor-pointer
                                                "
                                            >

                                                <Edit2
                                                    className="w-4 h-4"
                                                />

                                                <span>
                                                    Edit
                                                </span>

                                            </button>

                                            {/* =================================================
                                                DELETE
                                            ================================================= */}

                                            <button
                                                type="button"
                                                disabled={
                                                    deletingId ===
                                                    company._id
                                                }
                                                onClick={() =>
                                                    deleteCompanyHandler(
                                                        company._id
                                                    )
                                                }
                                                className="
                                                    flex
                                                    items-center
                                                    gap-2
                                                    w-full
                                                    px-4
                                                    py-3
                                                    text-sm
                                                    text-red-600
                                                    hover:bg-red-50
                                                    cursor-pointer
                                                    disabled:opacity-50
                                                    disabled:cursor-not-allowed
                                                "
                                            >

                                                <Trash2
                                                    className="w-4 h-4"
                                                />

                                                <span>
                                                    {deletingId ===
                                                    company._id
                                                        ? "Deleting..."
                                                        : "Delete"}
                                                </span>

                                            </button>

                                        </div>

                                    )}

                                </div>

                            </div>

                        </div>

                    ))
                )}

            </div>

        </div>
    );
};

export default CompaniesTable;