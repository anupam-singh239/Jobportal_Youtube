import { useEffect } from "react";

import axios from "axios";

import { useDispatch } from "react-redux";

import { setAllAppliedJobs } from "@/redux/jobSlice";

import { APPLICATION_API_END_POINT } from "@/utils/constant";


const useGetAppliedJobs = () => {

    const dispatch = useDispatch();


    useEffect(() => {

        const fetchAppliedJobs = async () => {

            try {

                const res = await axios.get(
                    `${APPLICATION_API_END_POINT}/get`,
                    {
                        withCredentials: true,
                    }
                );


                console.log(
                    "APPLIED JOBS RESPONSE:",
                    res.data
                );


                if (res.data?.success) {

                    dispatch(
                        setAllAppliedJobs(
                            res.data.applications || []
                        )
                    );

                } else {

                    dispatch(
                        setAllAppliedJobs([])
                    );

                }

            } catch (error) {

                console.error(
                    "Get Applied Jobs Error:",
                    error?.response?.data ||
                    error.message
                );

                dispatch(
                    setAllAppliedJobs([])
                );

            }

        };


        fetchAppliedJobs();

    }, [dispatch]);

};


export default useGetAppliedJobs;