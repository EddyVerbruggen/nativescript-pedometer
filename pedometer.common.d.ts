export interface PedometerUpdate {
    startDate: Date;
    endDate: Date;
    steps: number;
    distance?: number;
    floorsAscended?: number;
    floorsDescended?: number;
    currentPace?: number;
    currentCadence?: number;
    averageActivePace?: number;
}
export interface PedometerEventUpdate {
    type: string;
    date: Date;
}
export interface PedometerStartUpdatesOptions {
    fromDate?: Date;
    onUpdate: (data: PedometerUpdate) => void;
}
export interface PedometerStartEventUpdatesOptions {
    onUpdate: (data: PedometerEventUpdate) => void;
}
export interface PedometerQueryOptions {
    fromDate: Date;
    toDate?: Date;
}
export declare class Common {
    constructor();
}
