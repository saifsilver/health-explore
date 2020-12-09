import React, { useCallback, useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { addHospitals } from '../redux/actions/hospitalActions';
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
    const selectedFilters = useSelector(({ filters: { selected, search }}) => ({ selected, search }))
    const { jobsList, jobsCount } = useSelector(({ hospitals: { jobsList, jobsCount }}) => ({ jobsList, jobsCount }))
    const dispatch = useDispatch();

    const { status } = useCallback(() => useQuery(['jobs', selectedFilters], fetchJobs, {
        onSuccess: (data, status) => {
            console.log('Called Server')
            dispatch(addHospitals(data))
        }
    }), [selectedFilters.selected, selectedFilters.search])();

    return (
        <div className="my-5 bg-white p-5">
            <>
                <div className="flex justify-between items-center flex-wrap lg:flex-nowrap">
                    <h1 className="mb-1 font-semibold">{ status === 'success' ? (`${jobsCount} jobs posting`) : status === 'loading' ? <>Loading....</>: '' }</h1>
                    <div className="flex-col items-start md:flex-row md:items-center text-base flex-wrap justify-start">
                        <span className="ml-0 font-normal text-black">Sort by </span>
                        <SortBy title="Location" name="location" />
                        <SortBy title="Role" name="role" />
                        <SortBy title="Department" name="department" />
                        <SortBy title="Education" name="education" />
                        <SortBy title="Experience" name="experience" />
                    </div>
                </div>
                { status === 'success' && jobsList && jobsList.map( (hospital, index) => <Hospital key={index} hospital={hospital} /> ) }
                { status === 'loading' && <>Searching....</> }
                { status === 'error' && <>Error: Something Went Wrong!</> }
            </>
        </div>
    );
};

export default Jobs;