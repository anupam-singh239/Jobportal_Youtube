import React, { useEffect, useState } from "react";

import Navbar from "../ui/shared/Navbar";

import {
    ArrowLeft,
    Loader2,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";

import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";

import {
    COMPANY_API_END_POINT,
} from "@/utils/constant";

import {
    setSingleCompany,
} from "@/redux/companySlice";

const CompanySetup = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const dispatch = useDispatch();

    const {
        singleCompany,
    } = useSelector(
        (store) => store.company
    );

    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null,
    });

    const [loading, setLoading] =
        useState(false);

    const [preview, setPreview] =
        useState("");

    // =====================================================
    // GET COMPANY
    // =====================================================

    useEffect(() => {

        const fetchCompany = async () => {

            try {

                const res =
                    await axios.get(
                        `${COMPANY_API_END_POINT}/get/${id}`,
                        {
                            withCredentials: true,
                        }
                    );

                if (
                    res.data?.success
                ) {

                    dispatch(
                        setSingleCompany(
                            res.data.company
                        )
                    );

                }

            } catch (error) {

                console.error(
                    "Get Company Error:",
                    error
                );

                toast.error(
                    error?.response?.data?.message ||
                    "Failed to load company"
                );
            }
        };

        if (id) {
            fetchCompany();
        }

    }, [id, dispatch]);

    // =====================================================
    // SET COMPANY DATA
    // =====================================================

    useEffect(() => {

        if (!singleCompany) {
            return;
        }

        setInput({
            name:
                singleCompany.name ||
                "",

            description:
                singleCompany.description ||
                "",

            website:
                singleCompany.website ||
                "",

            location:
                singleCompany.location ||
                "",

            file: null,
        });

        setPreview(
            singleCompany.logo || ""
        );

    }, [singleCompany]);

    // =====================================================
    // INPUT CHANGE
    // =====================================================

    const changeEventHandler = (e) => {

        const {
            name,
            value,
        } = e.target;

        setInput(
            (prev) => ({
                ...prev,
                [name]: value,
            })
        );
    };

    // =====================================================
    // FILE CHANGE
    // =====================================================

    const changeFileHandler = (e) => {

        const file =
            e.target.files?.[0];

        if (!file) {
            return;
        }

        // Check image
        if (
            !file.type.startsWith(
                "image/"
            )
        ) {

            toast.error(
                "Please select an image file"
            );

            return;
        }

        // Check size
        if (
            file.size >
            5 * 1024 * 1024
        ) {

            toast.error(
                "Image size must be less than 5MB"
            );

            return;
        }

        setInput(
            (prev) => ({
                ...prev,
                file,
            })
        );

        // Preview
        const imageUrl =
            URL.createObjectURL(
                file
            );

        setPreview(imageUrl);
    };

    // =====================================================
    // SUBMIT
    // =====================================================

    const submitHandler = async (e) => {

        e.preventDefault();

        if (!id) {

            toast.error(
                "Company ID not found"
            );

            return;
        }

        try {

            setLoading(true);

            const formData =
                new FormData();

            formData.append(
                "name",
                input.name
            );

            formData.append(
                "description",
                input.description
            );

            formData.append(
                "website",
                input.website
            );

            formData.append(
                "location",
                input.location
            );

            // IMPORTANT
            // Field name MUST be "file"
            if (input.file) {

                formData.append(
                    "file",
                    input.file
                );
            }

            const res =
                await axios.put(
                    `${COMPANY_API_END_POINT}/update/${id}`,
                    formData,
                    {
                        withCredentials: true,
                    }
                );

            console.log(
                "UPDATE RESPONSE:",
                res.data
            );

            if (
                res.data?.success
            ) {

                dispatch(
                    setSingleCompany(
                        res.data.company
                    )
                );

                toast.success(
                    res.data.message ||
                    "Company updated successfully"
                );

                navigate(
                    "/admin/companies"
                );
            }

        } catch (error) {

            console.error(
                "Update Company Error:",
                error
            );

            toast.error(
                error?.response?.data?.message ||
                "Failed to update company"
            );

        } finally {

            setLoading(false);
        }
    };

    // =====================================================
    // IMAGE URL
    // =====================================================

    const getLogoUrl = () => {

        if (!preview) {
            return "";
        }

        // New browser preview
        if (
            preview.startsWith(
                "blob:"
            )
        ) {
            return preview;
        }

        // Already full URL
        if (
            preview.startsWith(
                "http://"
            ) ||
            preview.startsWith(
                "https://"
            )
        ) {
            return preview;
        }

        // Backend local image
        return `http://localhost:8000${preview}`;
    };

    // =====================================================
    // UI
    // =====================================================

    return (
        <div>

            <Navbar />

            <div className="max-w-4xl mx-auto px-4 my-10">

                {/* HEADER */}

                <div className="flex items-center gap-4 mb-8">

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/admin/companies"
                            )
                        }
                        className="flex items-center gap-2 border px-4 py-2 rounded-md hover:bg-gray-100"
                    >

                        <ArrowLeft
                            className="w-5 h-5"
                        />

                        Back

                    </button>

                    <div>

                        <h1 className="text-2xl font-bold">
                            Company Setup
                        </h1>

                        <p className="text-gray-500">
                            Update your company information
                        </p>

                    </div>

                </div>

                {/* FORM */}

                <form
                    onSubmit={
                        submitHandler
                    }
                    className="bg-white border rounded-lg p-6"
                >

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* NAME */}

                        <div>

                            <label className="block font-medium mb-2">
                                Company Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={
                                    input.name
                                }
                                onChange={
                                    changeEventHandler
                                }
                                className="w-full border rounded-md px-4 py-3 outline-none focus:border-black"
                                placeholder="Company Name"
                            />

                        </div>

                        {/* WEBSITE */}

                        <div>

                            <label className="block font-medium mb-2">
                                Website
                            </label>

                            <input
                                type="text"
                                name="website"
                                value={
                                    input.website
                                }
                                onChange={
                                    changeEventHandler
                                }
                                className="w-full border rounded-md px-4 py-3 outline-none focus:border-black"
                                placeholder="https://example.com"
                            />

                        </div>

                        {/* LOCATION */}

                        <div>

                            <label className="block font-medium mb-2">
                                Location
                            </label>

                            <input
                                type="text"
                                name="location"
                                value={
                                    input.location
                                }
                                onChange={
                                    changeEventHandler
                                }
                                className="w-full border rounded-md px-4 py-3 outline-none focus:border-black"
                                placeholder="Indore"
                            />

                        </div>

                        {/* DESCRIPTION */}

                        <div>

                            <label className="block font-medium mb-2">
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={
                                    input.description
                                }
                                onChange={
                                    changeEventHandler
                                }
                                className="w-full border rounded-md px-4 py-3 outline-none focus:border-black min-h-[110px]"
                                placeholder="Company Description"
                            />

                        </div>

                        {/* LOGO */}

                        <div className="md:col-span-2">

                            <label className="block font-medium mb-2">
                                Company Logo
                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={
                                    changeFileHandler
                                }
                                className="w-full border rounded-md px-4 py-3"
                            />

                            {/* LOGO PREVIEW */}

                            {preview && (
                                <div className="mt-5">

                                    <p className="text-sm text-gray-500 mb-2">
                                        Logo Preview
                                    </p>

                                    <img
                                        src={
                                            getLogoUrl()
                                        }
                                        alt="Company Logo"
                                        className="w-24 h-24 rounded-full object-cover border"
                                        onError={(
                                            e
                                        ) => {
                                            e.currentTarget.style.display =
                                                "none";
                                        }}
                                    />

                                </div>
                            )}

                        </div>

                    </div>

                    {/* BUTTON */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-8 bg-black text-white py-3 rounded-md hover:bg-gray-800 disabled:opacity-50 flex items-center justify-center"
                    >

                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />

                                Updating...
                            </>
                        ) : (
                            "Update Company"
                        )}

                    </button>

                </form>

            </div>

        </div>
    );
};

export default CompanySetup;