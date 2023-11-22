export interface IPaginationLinks{
    next?:string | null,
    previous?:string | null
}

export interface ICity {
    id: number,
    name: string,
    lat: number,
    lng:  number
}

export interface IAgency {
    id: number,
    name: string,
    logo?: string,
    phone?: string,
    bio?: string,
}
export interface IPropertyImage {
    id: number,
    property: number,
    image: string
}
export interface IAmenity {
    id: number,
    name: string
}
export interface IPosition {
    lat: number,
    lng: number
}

export interface IProperty {
    id?: number,
    title?: string,
    description?: string,
    category?: string,
    property_type?: string,
    city?: ICity,
    property_status?:boolean,
    price?: string,
    price_per?: string,
    total_area?: string,
    amenities?: IAmenity[]
    rooms?: number,
    agency?: IAgency
    latitude?: string,
    longitude?: string,
    images?: IPropertyImage[]
    created_at?: string
}


export const price_type:string[] = ['Day', 'Week', 'Month', 'Year']
export const property_type:string[] = ['House', 'Apartment', 'Office', 'Commercial']