import React, { useEffect } from "react";
import ApplicantsTable from "./ApplicantsTable";
import Navbar from "../ui/shared/Navbar";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setApplicants } from "@/redux/applicationSlice";

const Applicants = () => {
    const params = useParams();

    const dispatch = useDispatch();

    const { applicants } = useSelector(
        (store) => store.application
    );

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                console.log(
                    "Fetching applicants for Job:",
                    params.id
                );

                const res = await axios.get(
                    `${APPLICATION_API_END_POINT}/job/${params.id}`,
                    {
                        withCredentials: true,
                    }
                );

                console.log(
                    "Applicants API Response:",
                    res.data
                );

                if (res.data.success) {
                    dispatch(
                        setApplicants(
                            res.data.applications || []
                        )
                    );
                }

            } catch (error) {
                console.error(
                    "Fetch Applicants Error:",
                    error.response?.data || error.message
                );

                dispatch(setApplicants([]));
            }
        };

        if (params.id) {
            fetchAllApplicants();
        }
    }, [params.id, dispatch]);


    return (
        <div>
            <Navbar />

            <div className="max-w-7xl mx-auto px-4">

                <h1 className="font-bold text-xl my-5">
                    Applicants{" "}
                    <span className="text-gray-500">
                        ({applicants?.length || 0})
                    </span>
                </h1>

                <ApplicantsTable />

            </div>
        </div>
    );
};

export default Applicants;