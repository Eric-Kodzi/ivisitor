import { configureStore } from "@reduxjs/toolkit";
import { employeeReducer } from "../Features/Employee-Slice/EmployeeSlice";

export const store = configureStore({
    reducer: {
        employees: employeeReducer
    }
})