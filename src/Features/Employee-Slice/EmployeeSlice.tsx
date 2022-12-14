import { createSlice } from '@reduxjs/toolkit';
import { employeesData } from './employeeData';

const initialState = {
    employeesList: employeesData
}

export const employeeSlice = createSlice({
    name: "employees",
    initialState,
    reducers: {
        add: (state,action) => {
            state.employeesList.push(action.payload)
        }
    }
})




export const { add } = employeeSlice.actions;
export const employeeReducer = employeeSlice.reducer;





