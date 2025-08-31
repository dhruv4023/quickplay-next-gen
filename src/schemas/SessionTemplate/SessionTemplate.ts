export interface Court {
    courtId?: string;
    courtName: string;
    price: number;
    numberOfCourt: number;
}

export interface SessionTemplate {
    _id: string;
    sportId: string;
    locationId: string;
    courts: Court[];
    templateName: string;
    dayOfWeek: string[];
    startTime: string;
    endTime: string;
    frequency: string;
}