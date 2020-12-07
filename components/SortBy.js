import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doSort } from '../redux/actions/filterActions';

const SortBy = ({title, name}) => {
    const dispatch = useDispatch()

    const dir = useSelector(({filters: {sortby}}) => sortby[name])

    return (
        <button className={`block md:inline-block font-medium ml-0 md:ml-5 ${ dir ? 'text-black' : 'text-gray-400'}`} onClick={(e) => {
            e.preventDefault();
            dispatch(doSort(name));
        }}>{title} {dir && (dir === 'asc' ? '🔼' : '🔽')}</button>
    );
};

export default SortBy; 