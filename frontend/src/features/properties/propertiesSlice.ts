import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import PropertiesService from "./propertiesServices";

export const getAgencyProperties = createAsyncThunk(
    'properties/agency',
    async () => {
        const res = await PropertiesService.getAgencyProperties()
        return res.data;
    })


export const getProperties = createAsyncThunk(
    'properties/',
    async () => {
        const res = await PropertiesService.getProperties()
        return res.data;
    })


export const createProperty = createAsyncThunk(
    'properties/create',
    async (data) => {
        const res = await PropertiesService.createProperty(data)
        return res.data;
    })

export const updateProperty = createAsyncThunk(
    'properties/update',
    async (post) => {
        const res = await PropertiesService.updateProperty(post)
        return res.data;
    })

export const deleteProperty = createAsyncThunk(
    'properties/delete',
    async (postId) => {
        await PropertiesService.deleteProperty(postId)
        return postId;
    })

const initialState = {
    properties: [],
    error: null,
    listingID: null,

    isLoading: false,
    isSuccess: false,
}

export const propertiesSlice = createSlice({
    name: 'properties',
    initialState,
    reducers: {
        setInitialiseState(state) {
            state.properties = []
        },
    },
    extraReducers: {
        //  Get Agency Properties
        [getAgencyProperties.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getAgencyProperties.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.properties = action.payload
        },
        [getAgencyProperties.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        //  get Properties
        [getProperties.pending]: (state, action) => {
            state.isLoading = true;
        },
        [getProperties.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.properties = action.payload
        },
        [getProperties.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        //  Create Property 
        [createProperty.pending]: (state, action) => {
            state.isLoading = true;
            state.isSuccess = false
        },
        [createProperty.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true
            // state.posts.unshift(action.payload)
            state.properties.push(action.payload)
        },
        [createProperty.rejected]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = false
            state.error = action.payload;
        },

        /****** Update  Property ******/
        [updateProperty.pending]: (state, action) => {
            state.isLoading = true;
            state.isSuccess = false
        },
        [updateProperty.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true
            state.properties.map(post => {
                if (post.id === action.payload.id) {
                    return action.payload
                }
                return post;
            });
        },
        [updateProperty.rejected]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = false
            state.isError = true
            state.error = action.payload;
        },


        //*****  Delete Property */
        [deleteProperty.pending]: (state, action) => {
            state.isLoading = true;
        },
        [deleteProperty.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = true
            // state.posts = state.posts.filter(post => post.id !== action.payload)
            state.properties = state.properties.filter(post => post.id !== action.payload)
        },
        [deleteProperty.rejected]: (state, action) => {
            state.isLoading = false;
            state.isSuccess = false
            state.isError = true
            state.error = action.payload;
        },
    }
})

export const {
    setInitialiseState,
} = propertiesSlice.actions

export default propertiesSlice.reducer