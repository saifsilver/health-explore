import { ADD_FILTERS, SELECT_FILTER_ITEM, MORE_FILTER_ITEMS, SET_SEARCH, SET_SORT } from '../actions/filterActions';

const initialState = {
    records:{},
    more: false,
    selected:{},
    search:"",
    sortby:{}
}

const filterReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_FILTERS: 
            return {
                ...state, 
                records: action.filters
            };
        case SET_SEARCH:
            return {
                ...state, 
                search: action.search
            };
        case SET_SORT: {
            const notExist = typeof state.sortby[action.name] === 'undefined'
            const sortDir = notExist ? 'asc' : ( state.sortby[action.name] == 'asc' ? 'desc' : '' ) ;

            if(sortDir === ''){
                delete state.sortby[action.name]
            } else {
                state.sortby[action.name] = sortDir
            }

            return {
                ...state, 
                sortby: {
                    ...state.sortby
                }
            };
        }
        case SELECT_FILTER_ITEM: 
            const updateSelected = state.selected;
            const updatedRecords = state.records[action.payload.type].map(item => {

                const newItem = {
                    ...item,
                    selected: item.key === action.payload.key ? !item.selected : item.selected
                }

                if(typeof updateSelected[action.payload.type] === 'undefined'){
                    updateSelected[action.payload.type] = {}
                }

                if(newItem.selected){
                    updateSelected[action.payload.type][newItem.key] = true;
                } else {
                    delete updateSelected[action.payload.type][newItem.key];

                    if(Object.keys(updateSelected[action.payload.type]).length === 0 && updateSelected[action.payload.type].constructor === Object){
                        delete updateSelected[action.payload.type]
                    }
                }

                return newItem
            });

            return {
                ...state, 
                records: {
                    ...state.records,
                    [action.payload.type]: updatedRecords
                },
                selected: {...updateSelected}
            };
        case MORE_FILTER_ITEMS: 
            return {
                ...state, 
                more: action.payload.type
            };
        default: return { ...state };
    }
};

export default filterReducer;