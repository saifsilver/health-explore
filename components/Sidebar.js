import React, { useEffect } from 'react';
import Filter from './Filter';
import { fetchFilters } from '../redux/actions/filterActions'
import { useDispatch, useSelector } from 'react-redux';

const Sidebar = () => {
    const dispatch = useDispatch();
    const filterTypes = useSelector(state => Object.keys(state.filters.records));

    useEffect(() => {
        dispatch(fetchFilters())
    }, [])

    return (
        <div className="flex-shrink-0 w-1/4 mr-5 pt-5 hidden lg:block">
            { filterTypes.length > 0 ? filterTypes.map(title => <Filter key={title} title={title} limit={10} />) : <div>Loading filters...</div>}
        </div>
    );
};

export default React.memo(Sidebar);

// || data.results.map(f => <Filter {...f} />)