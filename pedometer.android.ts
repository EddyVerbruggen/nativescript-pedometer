import {Common, PedometerStartUpdatesOptions, PedometerStartEventUpdatesOptions, PedometerQueryOptions} from "./pedometer.common";
import * as utils from "utils/utils";

export class Pedometer extends Common {

 private sensorManager;

 constructor() {
   super();
   this.sensorManager = utils.ad.getApplicationContext().getSystemService(android.content.Context.SENSOR_SERVICE);
 }

 public isStepCountingAvailable(): Promise<any> {
    return new Promise((resolve, reject) => {
      let sensors = this.sensorManager.getSensorList("android.sensor.step_counter"); // android.hardware.Sensor.TYPE_STEP_COUNTER);
      resolve(sensors !== null && sensors.length > 0);
    });
 }

 public isDistanceAvailable(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(false);
    });
 }

 public isFloorCountingAvailable(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(false);
    });
 }

 public isPaceAvailable(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(false);
    });
 }

 public isCadenceAvailable(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(false);
    });
 }

 public isEventTrackingAvailable(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(false);
    });
 }

 public startUpdates(arg: PedometerStartUpdatesOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        if (!arg || typeof arg.onUpdate !== "function") {
          reject("onUpdate argument is required");
          return;
        }

        // TODO I don't have a compatible device to test.. so this needs to wait
        reject("Not implemented on Android yet (need a testdevice!)");
      } catch (ex) {
        reject(ex);
      }
    });
 }

 public stopUpdates(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        // TODO, same as startUpdates
        // this.sensorManager.unregisterListener(..);
        reject("Not implemented on Android yet (need a testdevice!)");
      } catch (ex) {
        reject(ex);
      }
    });
  }

}