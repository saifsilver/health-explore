import { ADD_FILTERS, SELECT_FILTER_ITEM, MORE_FILTER_ITEMS, SET_SEARCH, SET_SORT } from '../actions/filterActions';
import { ADD_HOSPITALS } from '../actions/hospitalActions';

const initialState = {
    sortby:{},
    jobsList:[],
    jobsCount:0
}

const hospitalReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_HOSPITALS: 
            return {
                ...state, 
                ...action.payload
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
                jobsList: state.sortby[action.name] ? [...sortBy(state.jobsList, action.name, sortDir)] : [...sortBy(state.jobsList, 'name', 'asc')],
                sortby: {
                    ...state.sortby
                }
            };
        }
        default: return { ...state };
    }
};
/* Sort List */
const sortBy = (hostitals, field, dir) => {
    let getVal = false
    switch(field){
      case 'location':   getVal = (a) => a.items[0].city; break;
      case 'department': getVal = (a) => a.items[0].department.join(','); break;
      case 'role':       getVal = (a) => a.job_title; break;
      case 'experience': getVal = (a) => a.items[0].experience; break;
      default:           getVal = (a) => a.name; break;
    }

    try {
      return getVal ? hostitals.sort((a, b) => {
        return dir === 'desc' ? getVal(a) < getVal(b) ? 1 : -1 : getVal(a) > getVal(b) ? 1 : -1
      }) : [];
    } catch (error) {
      return [];
    }
}

export default hospitalReducer;