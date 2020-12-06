import React from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import Hospital from './Hospital';
import SortBy from './SortBy';

const fetchJobs = async (key, filters) => {
    // Create a new AbortController instance for this request
    const controller = new AbortController()

    // Get the abortController's signal
    const signal = controller.signal

    const promise = fetch('/api/jobs', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(filters),
        signal
    }).then((res) => res.json());

    // Cancel the request if React Query calls the `promise.cancel` method
    promise.cancel = () => controller.abort()

    return promise
}

const Jobs = () => {
    const selectedFilters = useSelector(({ filters: { selected, search, sortby }}) => ({ selected, search, sortby }))

    const { data, status } = useQuery(['jobs', selectedFilters], fetchJobs)

    return (
        <div className="my-5 bg-white p-5">
           { status === 'loading' && <>Searching....</> }
           { status === 'error' && <>Error: Something Went Wrong!</> }
           { 
                status === 'success' && 
                <>
                    <div className="flex justify-between items-center flex-wrap lg:flex-nowrap">
                        <h1 className="mb-1 font-semibold">{data.jobsCount} jobs posting</h1>
                        <div className="flex justify-between items-center text-base">
                            <span className="ml-0 font-normal text-gray-400">Sort by </span>
                            <SortBy title="Location" name="location" />
                            <SortBy title="Role" name="role" />
                            <SortBy title="Department" name="department" />
                            <SortBy title="Education" name="education" />
                            <SortBy title="Experience" name="experience" />
                        </div>
                    </div>
                    { data.jobsList.map( (hospital, index) => <Hospital key={index} hospital={hospital} /> ) }
                </> 
            }
        </div>
    );
};

export default Jobs;