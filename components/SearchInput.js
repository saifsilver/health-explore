import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doSearch } from '../redux/actions/filterActions';

let searchInterval = null

const SearchInput = () => {
    const [search, setSearch] = useState('')
    const dispatch = useDispatch()
    return (
        <div className="p-2 relative text-gray-600 flex bg-white ">
            <button type="submit" className="absolute left-5 top-0 mt-5 mr-4">
                <img src="/img/search.svg" alt="Search" className="w-5" />
            </button>
            <input onChange={(e) => {
                if(typeof searchInterval !== 'undefined'){
                    clearTimeout(searchInterval)
                }

                e.preventDefault();
                searchInterval = setTimeout(() => {
                    dispatch(doSearch(search))
                }, 800)

                setSearch(e.target.value)
            }} className="w-full border-transparent bg-white px-5 pl-12 focus:outline-none focus:ring-transparent"
            type="search" name="search" placeholder="Search fot any job, title, keywords or company" value={search} />
        </div>
    );
};

export default SearchInput;