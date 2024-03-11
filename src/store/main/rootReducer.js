import { combineReducers } from '@reduxjs/toolkit';
import tableReducer from '../reducers/book'

const rootReducer = combineReducers({
  table: tableReducer,

});

export default rootReducer;