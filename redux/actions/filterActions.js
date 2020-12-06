import { useQuery } from "react-query";

//Action Types
export const ADD_FILTERS = "INCREMENT_COUNTER";
export const SELECT_FILTER_ITEM = "SELECT_FILTER_ITEM";
export const MORE_FILTER_ITEMS = 'MORE_FILTER_ITEMS';
export const SET_SEARCH = 'SET_SEARCH';
export const SET_SORT = 'SET_SORT'

//Action Creator
export const addFilters = (filters) => ({
   type: ADD_FILTERS,
   filters
});

export const doSearch = (search) => ({
   type: SET_SEARCH,
   search
});

export const doSort = (name) => ({
   type: SET_SORT,
   name
})

export const setFilterMore = (type) => ({
   type: MORE_FILTER_ITEMS,
   payload: {
      type
   }
});

export const selectFilter = (type, key) => ({
   type: SELECT_FILTER_ITEM,
   payload: {
      type, 
      key
   }
});


export const fetchFilters = () => dispatch => {
   return fetch('/api/filters')
   .then(res => res.json())
   .then(filters => dispatch(addFilters(filters)))
}