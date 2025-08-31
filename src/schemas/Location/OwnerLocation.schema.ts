export interface Location {
    _id: string;
    sports: Sport[];
    area: string;
    city: string;
    state: string;
    addressLine1: string;
    addressLine2: string;
    mapLink: string;
    locationName: string;
    images: string[];
}


export interface Sport {
    _id: string;
    name: string;
    icon: string;
}