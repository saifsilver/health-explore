import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, setFilterMore } from '../redux/actions/filterActions';

const Filter = ({ title, limit, hideTitle, cols }) => {
    const dispatch = useDispatch();
    const filterItems = useSelector(state => state.filters.records[title])
    hideTitle = (hideTitle || false) === false
    return title ? (
        <div className={`flex flex-col ${!hideTitle ? 'p-0 mt-5' : 'p-5'} bg-white mb-5`}>
            { hideTitle && <h1 className="font-bold text-black">{title.replace('_',' ').toUpperCase()}</h1> }
            <div className={`${ cols ? 'grid grid-cols-' + cols + ' gap-4' : 'grid grid-cols-1'}`}>
                {filterItems && filterItems.slice(0, limit || filterItems.length).map(({key, doc_count, selected}) => {
                    return (
                        <a href="#" onClick={(e) => {
                            e.preventDefault();
                            dispatch(selectFilter(title, key))
                        }} key={key} className={`leading-7  ${selected ? 'font-semibold text-blue-500 hover:text-blue-900': 'text-gray-600 hover:text-black'}`}>{selected ? '✅' : '⬜️'} {key} <span className="text-gray-400">({doc_count})</span></a>
                    );
                })}
            </div>
            { limit !== false && filterItems.length > limit ? <a className="text-gray-400 hover:text-black" href="#" onClick={(e) => {
                e.preventDefault();
                dispatch(setFilterMore(title))
            }}>Show more</a> : null }
        </div>
    ) : null;
};

export default React.memo(Filter);