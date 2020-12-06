import React, { useState } from 'react';
import Job from './Job';

const Hospital = ({ hospital }) => {
    const [open, toggleOpen] = useState(false);

    return (
        <div className="mb-4 cursor-pointer my-5 font-medium text-base" onClick={(e) => {
            e.stopPropagation();
            toggleOpen(old => !old)
        }}>
            <div className="hover:underline">
                <span className="inline-flex items-center justify-center rounded-sm bg-gray-200 mr-3 p-2">{ hospital.items[0].state }</span>
                { hospital.items.length } jobs for { hospital.name } | { hospital.items[0].city }
            </div>
            { open && hospital.items.map( job => <Job key={job.job_id} job={job} /> ) }
        </div>
    );
};

export default Hospital;