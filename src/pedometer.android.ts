import {Common, PedometerStartUpdatesOptions, PedometerStartEventUpdatesOptions, PedometerQueryOptions} from "./pedometer.common";
import * as utils from "tns-core-modules/utils/utils";

enum STATE {
  STARTING,
  STARTED,
  ERROR_FAILED_TO_START,
  STOPPED
}

export class Pedometer extends Common {

 private sensor;
 private sensorManager;
 private sensorEventListener;
 private state: STATE;
 private startSteps = 0;
 private startTimestamp = 0;

 constructor() {
   super();
   this.sensorManager = utils.ad.getApplicationContext().getSystemService(android.content.Context.SENSOR_SERVICE);
 }

 public isStepCountingAvailable(): Promise<any> {
    return new Promise((resolve, reject) => {
      let sensors = this.sensorManager.getSensorList(19); // android.hardware.Sensor.TYPE_STEP_COUNTER);
      resolve(sensors.size() > 0);
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

        let sensors = this.sensorManager.getSensorList(19); // android.hardware.Sensor.TYPE_STEP_COUNTER);
        if (sensors.size() > 0) {
          this.sensor = sensors.get(0);
          this.startSteps = 0;

          // unlike iOS, Android doesn't support history when querying the step sensor, so we're grabbing it manually
          if (arg.fromDate) {
            console.log("Note that unlike iOS, Android doesn't support historic step data. Alternative, use this: https://github.com/EddyVerbruggen/nativescript-health-data/tree/cb852903bbf8fbad7d63b6c1df799a97014746d1#query");
          }

          this.startTimestamp = new Date().getTime();

          this.sensorEventListener = new android.hardware.SensorEventListener({
            onSensorChanged: sensorEvent => {
              if (sensorEvent.sensor.getType() === 19) {
                if (this.state === STATE.STOPPED) {
                  return;
                }
                this.state = STATE.STARTED;

                let steps = sensorEvent.values[0];

                if (this.startSteps === 0) {
                  this.startSteps = steps;
                }

                steps = steps - this.startSteps;

                arg.onUpdate({
                  startDate: new Date(this.startTimestamp),
                  endDate: new Date(),
                  steps: steps
                });
              }
            },
            onAccuracyChanged: (sensor, accuracy) => {
              // ignoring this event
            }
          });

          if (this.sensorManager.registerListener(this.sensorEventListener, this.sensor, android.hardware.SensorManager.SENSOR_DELAY_UI)) {
            this.state = STATE.STARTING;
          } else {
            this.state = STATE.ERROR_FAILED_TO_START;
            reject("Failed to start");
          }
        } else {
          this.state = STATE.ERROR_FAILED_TO_START;
          reject("Failed to start - No sensors found to register step counter listening to.");
        }
      } catch (ex) {
        reject(ex);
      }
    });
 }

 public stopUpdates(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        if (this.sensorEventListener) {
          this.sensorManager.unregisterListener(this.sensorEventListener);
          this.state = STATE.STOPPED;
        }
        resolve();
      } catch (ex) {
        reject(ex);
      }
    });
  }

}