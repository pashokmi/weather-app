import { combineReducers } from '@reduxjs/toolkit';
import userDataSlice from './userDataSlice';

export const rootReducer = combineReducers({
    userData: userDataSlice,
});

export type RootState = ReturnType<typeof rootReducer>;