import React, { useState } from 'react';
import { formatDistance } from 'date-fns'


const Job = ({job}) => {
    const [details, toggleDetails] = useState(false);

    return (
        <div className="py-5 hover:bg-blue-50 px-5 my-2 border border-gray-200">
            <div className="flex-col md:flex-row justify-between items-center" onClick={(e) => {
                e.stopPropagation();
                toggleDetails(old => !old) 
            }}>
                <div className="font-bold hover:underline">
                    {job.job_title}
                    <div className="font-medium">
                    {job.job_type} | {job.salary_range.join('-')} an hour | {job.city}
                    </div>
                </div>
                <div>{formatDistance(new Date(job.created), new Date()).replace(' ago','')+' ago'}</div>
            </div>
            {details && <>
                <div className="py-10 flex flex-col md:flex-row ">
                    <div className="w-full md:w-3/4">
                        <div className="flex justify-between items-start my-3"><div className="w-1/2">Department:</div><div className="w-1/2">{job.department.join(', ')}</div></div>
                        <div className="flex justify-between items-start my-3"><div className="w-1/2">Hours / shifts</div><div className="w-1/2">{job.hours.join('/')} / {job.work_schedule}</div></div>
                        <div className="flex justify-between items-start my-3"><div className="w-1/2">Summery</div><div className="w-1/2">{job.description}</div></div>
                    </div>
                    <div className="w-full md:w-1/4 flex flex-col justify-center items-center">
                        <button className="border border-blue-500 bg-blue-500 text-white px-6 py-1 rounded-xl mb-3" onClick={(e)=>{
                             e.stopPropagation();
                        }}>Job details</button>
                        <button className="rounded-xl border border-blue-500 text-blue-500 px-6 py-1" onClick={(e)=>{
                            e.stopPropagation();
                            alert('Saved')
                        }}>Save job</button>
                    </div>
                </div>
            </>}
        </div>
    );
};

export default Job;