import { Common, PedometerStartUpdatesOptions } from "./pedometer.common";
export declare class Pedometer extends Common {
    private sensorManager;
    constructor();
    isStepCountingAvailable(): Promise<any>;
    isDistanceAvailable(): Promise<any>;
    isFloorCountingAvailable(): Promise<any>;
    isPaceAvailable(): Promise<any>;
    isCadenceAvailable(): Promise<any>;
    isEventTrackingAvailable(): Promise<any>;
    startUpdates(arg: PedometerStartUpdatesOptions): Promise<any>;
    stopUpdates(): Promise<any>;
}
