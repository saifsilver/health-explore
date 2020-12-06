import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doSearch } from '../redux/actions/filterActions';

let searchInterval = null

const SearchInput = () => {
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()
    return (
        <div className="p-2 relative text-gray-600 flex bg-white ">
            <input onChange={(e) => {
                if(typeof searchInterval !== 'undefined'){
                    clearTimeout(searchInterval)
                }

                e.preventDefault();
                searchInterval = setTimeout(() => {
                    dispatch(doSearch(search))
                }, 1500)

                setSearch(e.target.value)
            }} className="w-full border-transparent bg-white px-5 pr-16 focus:outline-none focus:ring-transparent"
            type="search" name="search" placeholder="Search fot any job, title, keywords or company" value={search} />
            <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
                <img src="/img/search.svg" alt="Search" className="w-5" />
            </button>
        </div>
    );
};

export default SearchInput;