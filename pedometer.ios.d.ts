import { Common, PedometerStartUpdatesOptions, PedometerStartEventUpdatesOptions, PedometerQueryOptions } from "./pedometer.common";
export declare class Pedometer extends Common {
    private cmPedometer;
    constructor();
    isStepCountingAvailable(): Promise<any>;
    isDistanceAvailable(): Promise<any>;
    isFloorCountingAvailable(): Promise<any>;
    isPaceAvailable(): Promise<any>;
    isCadenceAvailable(): Promise<any>;
    isEventTrackingAvailable(): Promise<any>;
    private getStepUpdate(cmPedometerData);
    query(arg: PedometerQueryOptions): Promise<any>;
    startUpdates(arg: PedometerStartUpdatesOptions): Promise<any>;
    stopUpdates(): Promise<any>;
    startEventUpdates(arg: PedometerStartEventUpdatesOptions): Promise<any>;
    stopEventUpdates(): Promise<any>;
}
