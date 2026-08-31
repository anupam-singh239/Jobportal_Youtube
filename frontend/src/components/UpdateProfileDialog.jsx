import React, { useEffect, useState } from "react";
import { Loader2, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";

import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";

const UpdateProfileDialog = ({ open, setOpen }) => {

    const [loading, setLoading] = useState(false);

    const { user } = useSelector((store) => store.auth);

    const dispatch = useDispatch();

    // =====================================================
    // FORM STATE
    // =====================================================

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        bio: "",
        skills: "",
        file: null,
    });


    // =====================================================
    // LOAD EXISTING USER DATA
    // =====================================================

    useEffect(() => {

        if (user && open) {

            setInput({
                fullname: user?.fullname || "",
                email: user?.email || "",
                phoneNumber: user?.phoneNumber || "",
                bio: user?.profile?.bio || "",

                skills: Array.isArray(user?.profile?.skills)
                    ? user.profile.skills.join(", ")
                    : "",

                // Existing resume ko file input me set
                // nahi kar sakte.
                file: null,
            });

        }

    }, [user, open]);


    // =====================================================
    // TEXT INPUT CHANGE
    // =====================================================

    const changeEventHandler = (e) => {

        const { name, value } = e.target;

        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));

    };


    // =====================================================
    // RESUME FILE CHANGE
    // =====================================================

    const fileChangeHandler = (e) => {

        const selectedFile = e.target.files?.[0];

        if (!selectedFile) {
            return;
        }


        // =================================================
        // ONLY PDF
        // =================================================

        if (selectedFile.type !== "application/pdf") {

            toast.error("Only PDF files are allowed");

            e.target.value = "";

            setInput((prev) => ({
                ...prev,
                file: null,
            }));

            return;
        }


        // =================================================
        // MAX 10 MB
        // =================================================

        const maxSize = 10 * 1024 * 1024;

        if (selectedFile.size > maxSize) {

            toast.error("Resume size must be less than 10 MB");

            e.target.value = "";

            setInput((prev) => ({
                ...prev,
                file: null,
            }));

            return;
        }


        // =================================================
        // SAVE FILE
        // =================================================

        setInput((prev) => ({
            ...prev,
            file: selectedFile,
        }));


        console.log("Selected Resume:", {
            name: selectedFile.name,
            type: selectedFile.type,
            size: selectedFile.size,
        });

    };


    // =====================================================
    // SUBMIT
    // =====================================================

    const submitHandler = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const formData = new FormData();


            // =================================================
            // USER INFORMATION
            // =================================================

            formData.append(
                "fullname",
                input.fullname
            );

            formData.append(
                "email",
                input.email
            );

            formData.append(
                "phoneNumber",
                input.phoneNumber
            );

            formData.append(
                "bio",
                input.bio
            );

            formData.append(
                "skills",
                input.skills
            );


            // =================================================
            // RESUME
            // IMPORTANT:
            // Backend me resumeUpload.single("file")
            // hona chahiye.
            // =================================================

            if (input.file) {

                formData.append(
                    "file",
                    input.file
                );

                console.log(
                    "Uploading Resume:",
                    input.file.name
                );

            }


            // =================================================
            // DEBUG FORM DATA
            // =================================================

            console.log("Profile update started");

            for (const [key, value] of formData.entries()) {

                console.log(
                    key,
                    value instanceof File
                        ? value.name
                        : value
                );

            }


            // =================================================
            // API REQUEST
            // =================================================

            const res = await axios.put(
                `${USER_API_END_POINT}/profile/update`,
                formData,
                {
                    withCredentials: true,

                    // Axios ko boundary automatically
                    // set karne do.
                }
            );


            // =================================================
            // SUCCESS
            // =================================================

            if (res.data.success) {

                dispatch(
                    setUser(res.data.user)
                );

                toast.success(
                    res.data.message ||
                    "Profile updated successfully"
                );

                setOpen(false);


                // File input clear
                setInput((prev) => ({
                    ...prev,
                    file: null,
                }));

            }

        } catch (error) {

            console.error(
                "Profile Update Error:",
                error
            );


            toast.error(
                error?.response?.data?.message ||
                error?.message ||
                "Profile update failed"
            );

        } finally {

            setLoading(false);

        }

    };


    // =====================================================
    // CLOSE
    // =====================================================

    if (!open) {
        return null;
    }


    // =====================================================
    // UI
    // =====================================================

    return (

        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setOpen(false)}
        >

            <div
                className="w-full max-w-md rounded-xl bg-white shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >

                {/* =================================================
                    HEADER
                ================================================= */}

                <div className="flex items-center justify-between border-b px-6 py-4">

                    <h2 className="text-lg font-semibold">
                        Update Profile
                    </h2>

                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-black"
                    >
                        <X size={20} />
                    </button>

                </div>


                {/* =================================================
                    FORM
                ================================================= */}

                <form onSubmit={submitHandler}>

                    <div className="grid gap-4 p-6">


                        {/* NAME */}

                        <div className="grid grid-cols-4 items-center gap-4">

                            <label
                                htmlFor="fullname"
                                className="text-right text-sm font-medium"
                            >
                                Name
                            </label>

                            <input
                                id="fullname"
                                name="fullname"
                                type="text"
                                value={input.fullname}
                                onChange={changeEventHandler}
                                placeholder="Enter your name"
                                className="col-span-3 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
                            />

                        </div>


                        {/* EMAIL */}

                        <div className="grid grid-cols-4 items-center gap-4">

                            <label
                                htmlFor="email"
                                className="text-right text-sm font-medium"
                            >
                                Email
                            </label>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={input.email}
                                onChange={changeEventHandler}
                                placeholder="Enter your email"
                                className="col-span-3 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
                            />

                        </div>


                        {/* PHONE */}

                        <div className="grid grid-cols-4 items-center gap-4">

                            <label
                                htmlFor="phoneNumber"
                                className="text-right text-sm font-medium"
                            >
                                Number
                            </label>

                            <input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="tel"
                                value={input.phoneNumber}
                                onChange={changeEventHandler}
                                placeholder="Enter phone number"
                                className="col-span-3 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
                            />

                        </div>


                        {/* BIO */}

                        <div className="grid grid-cols-4 items-start gap-4">

                            <label
                                htmlFor="bio"
                                className="pt-2 text-right text-sm font-medium"
                            >
                                Bio
                            </label>

                            <textarea
                                id="bio"
                                name="bio"
                                value={input.bio}
                                onChange={changeEventHandler}
                                placeholder="Write something about yourself"
                                rows="3"
                                className="col-span-3 resize-none rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
                            />

                        </div>


                        {/* SKILLS */}

                        <div className="grid grid-cols-4 items-center gap-4">

                            <label
                                htmlFor="skills"
                                className="text-right text-sm font-medium"
                            >
                                Skills
                            </label>

                            <input
                                id="skills"
                                name="skills"
                                type="text"
                                value={input.skills}
                                onChange={changeEventHandler}
                                placeholder="HTML, CSS, React"
                                className="col-span-3 rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
                            />

                        </div>


                        {/* =================================================
                            RESUME
                        ================================================= */}

                        <div className="grid grid-cols-4 items-center gap-4">

                            <label
                                htmlFor="file"
                                className="text-right text-sm font-medium"
                            >
                                Resume
                            </label>

                            <div className="col-span-3">

                                <input
                                    id="file"
                                    name="file"
                                    type="file"
                                    accept="application/pdf,.pdf"
                                    onChange={fileChangeHandler}
                                    className="w-full cursor-pointer rounded-md border border-gray-300 px-3 py-2 text-sm"
                                />


                                {/* Selected file */}

                                {input.file && (

                                    <p className="mt-2 text-xs text-green-600">

                                        Selected:
                                        {" "}
                                        {input.file.name}

                                    </p>

                                )}


                                {/* Existing resume */}

                                {!input.file &&
                                    user?.profile?.resumeOriginalName && (

                                        <p className="mt-2 text-xs text-gray-500">

                                            Current resume:
                                            {" "}
                                            {user.profile.resumeOriginalName}

                                        </p>

                                    )}

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        FOOTER
                    ================================================= */}

                    <div className="border-t px-6 py-4">

                        {loading ? (

                            <button
                                type="button"
                                disabled
                                className="flex w-full items-center justify-center rounded-md bg-black px-4 py-2.5 text-sm font-medium text-white opacity-80"
                            >

                                <Loader2
                                    className="mr-2 h-4 w-4 animate-spin"
                                />

                                Uploading...

                            </button>

                        ) : (

                            <button
                                type="submit"
                                className="w-full rounded-md bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                            >
                                Update
                            </button>

                        )}

                    </div>

                </form>

            </div>

        </div>
    );
};

export default UpdateProfileDialog;