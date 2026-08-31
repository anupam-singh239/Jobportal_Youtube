import React from "react";
import {
    MoreHorizontal,
} from "lucide-react";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../ui/popover";

import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";

import { APPLICATION_API_END_POINT } from "@/utils/constant";

const shortlistingStatus = [
    "accepted",
    "rejected",
];

const ApplicantsTable = () => {

    const { applicants } = useSelector(
        (store) => store.application
    );


    const statusHandler = async (status, id) => {
        try {

            console.log(
                "Updating application:",
                id,
                "Status:",
                status
            );

            const res = await axios.put(
                `${APPLICATION_API_END_POINT}/status/${id}`,
                {
                    status,
                },
                {
                    withCredentials: true,
                }
            );

            console.log(
                "Status update response:",
                res.data
            );

            if (res.data.success) {
                toast.success(
                    res.data.message
                );
            }

        } catch (error) {

            console.error(
                "Update Status Error:",
                error.response?.data ||
                error.message
            );

            toast.error(
                error.response?.data?.message ||
                "Failed to update application status"
            );
        }
    };


    return (
        <div>

            <Table>

                <TableCaption>
                    A list of applicants for this job
                </TableCaption>


                <TableHeader>

                    <TableRow>

                        <TableHead>
                            Full Name
                        </TableHead>

                        <TableHead>
                            Email
                        </TableHead>

                        <TableHead>
                            Contact
                        </TableHead>

                        <TableHead>
                            Resume
                        </TableHead>

                        <TableHead>
                            Date
                        </TableHead>

                        <TableHead className="text-right">
                            Action
                        </TableHead>

                    </TableRow>

                </TableHeader>


                <TableBody>

                    {applicants &&
                    applicants.length > 0 ? (

                        applicants.map(
                            (item) => (

                                <TableRow
                                    key={item?._id}
                                >

                                    {/* NAME */}

                                    <TableCell>
                                        {
                                            item?.applicant
                                                ?.fullname ||
                                            "N/A"
                                        }
                                    </TableCell>


                                    {/* EMAIL */}

                                    <TableCell>
                                        {
                                            item?.applicant
                                                ?.email ||
                                            "N/A"
                                        }
                                    </TableCell>


                                    {/* PHONE */}

                                    <TableCell>
                                        {
                                            item?.applicant
                                                ?.phoneNumber ||
                                            "N/A"
                                        }
                                    </TableCell>


                                    {/* RESUME */}

                                    <TableCell>

                                        {
                                            item?.applicant
                                                ?.profile
                                                ?.resume ? (

                                                <a
                                                    href={
                                                        item
                                                            ?.applicant
                                                            ?.profile
                                                            ?.resume
                                                    }
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline"
                                                >
                                                    {
                                                        item
                                                            ?.applicant
                                                            ?.profile
                                                            ?.resumeOriginalName ||
                                                        "View Resume"
                                                    }
                                                </a>

                                            ) : (
                                                <span>
                                                    NA
                                                </span>
                                            )
                                        }

                                    </TableCell>


                                    {/* DATE */}

                                    <TableCell>

                                        {
                                            item?.createdAt
                                                ? new Date(
                                                    item.createdAt
                                                ).toLocaleDateString(
                                                    "en-IN"
                                                )
                                                : "N/A"
                                        }

                                    </TableCell>


                                    {/* ACTION */}

                                    <TableCell className="text-right">

                                        <Popover>

                                            <PopoverTrigger
                                                asChild
                                            >

                                                <button
                                                    type="button"
                                                    className="p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                                                >
                                                    <MoreHorizontal className="w-5 h-5" />
                                                </button>

                                            </PopoverTrigger>


                                            <PopoverContent className="w-36">

                                                {
                                                    shortlistingStatus.map(
                                                        (
                                                            status
                                                        ) => (

                                                            <button
                                                                key={
                                                                    status
                                                                }
                                                                type="button"
                                                                onClick={() =>
                                                                    statusHandler(
                                                                        status,
                                                                        item?._id
                                                                    )
                                                                }
                                                                className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100 rounded cursor-pointer capitalize"
                                                            >

                                                                {
                                                                    status
                                                                }

                                                            </button>

                                                        )
                                                    )
                                                }

                                            </PopoverContent>

                                        </Popover>

                                    </TableCell>

                                </TableRow>

                            )
                        )

                    ) : (

                        <TableRow>

                            <TableCell
                                colSpan={6}
                                className="text-center py-10 text-gray-500"
                            >
                                No applicants found
                            </TableCell>

                        </TableRow>

                    )}

                </TableBody>

            </Table>

        </div>
    );
};

export default ApplicantsTable;