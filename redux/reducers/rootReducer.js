import filterReducer from './filterReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    filters: filterReducer
});

export default rootReducer;