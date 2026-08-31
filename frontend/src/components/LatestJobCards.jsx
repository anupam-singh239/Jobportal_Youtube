import { Badge } from '@/components/ui/badge'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/description/${job._id}`)}
            className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'
        >

            {/* ================= COMPANY ================= */}

            <div className='flex items-center gap-3'>

                {/* Company Logo */}
                <div className='w-12 h-12 rounded-md border border-gray-200 bg-white flex items-center justify-center overflow-hidden flex-shrink-0'>

                    {job?.company?.logo ? (
                        <img
                            src={job.company.logo}
                            alt={job?.company?.name || "Company"}
                            className='w-full h-full object-contain p-1'
                        />
                    ) : (
                        <div className='text-gray-400 text-xs font-medium'>
                            Logo
                        </div>
                    )}

                </div>

                {/* Company Name */}
                <div>
                    <h1 className='font-medium text-lg'>
                        {job?.company?.name}
                    </h1>

                    <p className='text-sm text-gray-500'>
                        India
                    </p>
                </div>

            </div>


            {/* ================= JOB DETAILS ================= */}

            <div>
                <h1 className='font-bold text-lg my-2'>
                    {job?.title}
                </h1>

                <p className='text-sm text-gray-600'>
                    {job?.description}
                </p>
            </div>


            {/* ================= BADGES ================= */}

            <div className='flex items-center gap-2 mt-4'>

                <Badge
                    className={'text-blue-700 font-bold'}
                    variant="ghost"
                >
                    {job?.position}
                </Badge>

                <Badge
                    className={'text-[#F83002] font-bold'}
                    variant="ghost"
                >
                    {job?.jobType}
                </Badge>

                <Badge
                    className={'text-[#7209B7] font-bold'}
                    variant="ghost"
                >
                    {job?.salary}LPA
                </Badge>

            </div>

        </div>
    )
}

export default LatestJobCards