import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import AgenciesService from "./agenciesServices";
import { IProperty } from "types/properties";





export const getAgencyInfo = createAsyncThunk(
    'agencies/',
    async () => {
        const res = await AgenciesService.getAgencyInfo()
        return res.data;
    })

export const updateAgencyInfo = createAsyncThunk(
    'agencies/update',
    async (data) => {
        console.log('test 2')
        const res = await AgenciesService.updateAgencyInfo(data)
        return res.data;
    })

interface PropertyState{
    properties:IProperty[],
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
    isLoading: boolean,
    isSuccess: boolean,
    isError: boolean,
}

const initialState = {
    loading:"idle",
    agency: null,
    error: null,   
    isLoading: false,
    isSuccess: false,
    isError: false,
    properties:[]
} as PropertyState

export const agenciesSlice = createSlice({
    name: 'agencies',
    initialState,
    reducers: {
        setInitialiseState(state) {
            state.properties = []
        },       
    },
    extraReducers: (builder)=>{
        builder.addCase(getAgencyInfo.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true
            // state.agency = action.payload            
        })

        builder.addCase(updateAgencyInfo.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true
            // state.agency = action.payload           
        })

        /****** Get Agency Info ******/
        // [getAgencyInfo.pending]: (state, action) => {
        //     state.isLoading = true;
        //     state.isSuccess = false
        // },
        // [getAgencyInfo.fulfilled]: (state, action) => {
        //     state.isLoading = false;
        //     state.isSuccess = true
        //     state.agency = action.payload            
        // },
        // [getAgencyInfo.rejected]: (state, action) => {
        //     state.isLoading = false;
        //     state.isSuccess = false
        //     state.isError = true
        //     state.error = action.payload;
        // },

         /****** Update  Agency Info ******/
        //  [updateAgencyInfo.pending]: (state, action) => {
        //     state.isLoading = true;
        //     state.isSuccess = false
        // },
        // [updateAgencyInfo.fulfilled]: (state, action) => {
        //     state.isLoading = false;
        //     state.isSuccess = true
        //     state.agency = action.payload 
        // },
        // [updateAgencyInfo.rejected]: (state, action) => {
        //     state.isLoading = false;
        //     state.isSuccess = false
        //     state.isError = true
        //     state.error = action.payload;
        // },
            
    }
})

export const {
    setInitialiseState,
} = agenciesSlice.actions

export default agenciesSlice.reducer