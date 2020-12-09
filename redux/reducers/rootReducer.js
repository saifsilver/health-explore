import {combineReducers} from 'redux';
import filterReducer from './filterReducer';
import hospitalReducer from './hospitalReducer';

const rootReducer = combineReducers({
    filters: filterReducer,
    hospitals: hospitalReducer
});

export default rootReducer;