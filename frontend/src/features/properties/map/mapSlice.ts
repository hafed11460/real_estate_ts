import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { IPosition } from "types/properties";
interface IPrice {
    min: number,
    max: number,
}
interface IMapFilter {
    city: number,
    propertyType: string[],
    price: IPrice
}
interface MapState {
    propertyId: number | null,
    currentPosition: IPosition,
    mapfilter: IMapFilter,
    query: string,

}

const initialState: MapState = {
    currentPosition: {
        lat: 36.72440903333444,
        lng: 3.08104183285631
    },
    propertyId: null,
    query: '',
    mapfilter: {
        city: 0,
        price: { min: 0, max: 0 },
        propertyType: []
    }
}

export const mapSlice = createSlice({
    name: "map",
    initialState: initialState,
    reducers: {
        setPropertyType: (state, { payload }: PayloadAction<string>) => {
            const findIdx = state.mapfilter.propertyType.indexOf(payload)
            if (findIdx > -1) {
                state.mapfilter.propertyType = state.mapfilter.propertyType.filter(p => p !== payload)
            } else {
                state.mapfilter.propertyType.push(payload)
            }
        },
        updatePrice: (state, { payload }: PayloadAction<IPrice>) => {
            state.mapfilter.price = payload
        },
        setPosition: (state, { payload }) => {
            state.currentPosition = payload
            console.log(state.currentPosition)
        },
        setQueryParams: (state, { payload }) => {
            state.query = payload
            console.log(state.query)
        },
        setPropertyID: (state, { payload }) => {
            state.propertyId = payload
            console.log(state.propertyId)
        }
    }
})
export const {
    setPosition,
    setPropertyID,
    setQueryParams,
    setPropertyType,
} = mapSlice.actions
export default mapSlice.reducer
export const selectCurrentPosition = (state: RootState) => state.map.currentPosition
export const selectCurrentPositionID = (state: RootState) => state.map.propertyId
export const selectQueryParams = (state: RootState) => state.map.query
export const selectMapFilter = (state: RootState) => state.map.mapfilter