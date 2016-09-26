import {Common, PedometerStartUpdatesOptions, PedometerStartEventUpdatesOptions, PedometerQueryOptions} from "./pedometer.common";

declare var CMPedometer, CMPedometerEventTypePause, CMPedometerEventTypeResume, NSDate;

export class Pedometer extends Common {

 private cmPedometer;

 constructor() {
   super();
   this.cmPedometer = CMPedometer.new();
 }

 public isStepCountingAvailable(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(
        typeof CMPedometer.isStepCountingAvailable === "function" &&
        CMPedometer.isStepCountingAvailable()
      );
    });
 }

 public isDistanceAvailable(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(
        typeof CMPedometer.isDistanceAvailable === "function" &&
        CMPedometer.isDistanceAvailable()
      );
    });
 }

 public isFloorCountingAvailable(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(
        typeof CMPedometer.isFloorCountingAvailable === "function" &&
        CMPedometer.isFloorCountingAvailable()
      );
    });
 }

 public isPaceAvailable(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(
        typeof CMPedometer.isPaceAvailable === "function" &&
        CMPedometer.isPaceAvailable()
      );
    });
 }

 public isCadenceAvailable(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(
        typeof CMPedometer.isCadenceAvailable === "function" &&
        CMPedometer.isCadenceAvailable()
      );
    });
 }

 public isEventTrackingAvailable(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(
        typeof CMPedometer.isPedometerEventTrackingAvailable === "function" &&
        CMPedometer.isPedometerEventTrackingAvailable());
    });
 }

 private getStepUpdate(cmPedometerData) {
   return {
     startDate: cmPedometerData.startDate,
     endDate: cmPedometerData.endDate,
     steps: cmPedometerData.numberOfSteps,
     distance: cmPedometerData.distance,
     floorsAscended: cmPedometerData.floorsAscended,
     floorsDescended: cmPedometerData.floorsDescended,
     currentPace: cmPedometerData.currentPace, // seconds/meter, since iOS 9
     currentCadence: cmPedometerData.currentCadence, // steps/second, since iOS 9
     averageActivePace: cmPedometerData.averageActivePace // seconds/meter, since iOS 10
   };
 }

 public query(arg: PedometerQueryOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        if (!arg || !arg.fromDate) {
          reject("fromDate is required");
          return;
        }

        let fromDate = arg.fromDate;
        let toDate = arg.toDate || new Date();
        let that = this;
        this.cmPedometer.queryPedometerDataFromDateToDateWithHandler(fromDate, toDate, function (cmPedometerData, error) {
          if (error) {
            reject(error.localizedDescription);
          } else {
            resolve(that.getStepUpdate(cmPedometerData));
          }
        });
      } catch (ex) {
        reject(ex);
      }
    });
 }

 public startUpdates(arg: PedometerStartUpdatesOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        if (!arg || typeof arg.onUpdate !== "function") {
          reject("onUpdate argument is required");
          return;
        }

        let fromDate = arg.fromDate || new Date();
        let that = this;
        this.cmPedometer.startPedometerUpdatesFromDateWithHandler(fromDate, function (cmPedometerData, error) {
          if (error) {
            reject(error.localizedDescription);
          } else {
            arg.onUpdate(that.getStepUpdate(cmPedometerData));
          }
        });
        resolve();
      } catch (ex) {
        reject(ex);
      }
    });
 }

 public stopUpdates(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.cmPedometer.stopPedometerUpdates();
        resolve();
      } catch (ex) {
        reject(ex);
      }
    });
  }

 public startEventUpdates(arg: PedometerStartEventUpdatesOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        // requires iOS 10+
        if (typeof this.cmPedometer.startPedometerEventUpdatesWithHandler !== "function") {
          reject("Not supported");
          return;
        };

        if (!arg || typeof arg.onUpdate !== "function") {
          reject("onUpdate argument is required");
          return;
        }

        this.cmPedometer.startPedometerEventUpdatesWithHandler(function (cmPedometerEvent, error) {
          if (error) {
            reject(error.localizedDescription);
          } else {
            let isPaused = cmPedometerEvent.type === CMPedometerEventTypePause;
            arg.onUpdate({
              type: isPaused ? "pause" : "resume",
              date: cmPedometerEvent.date
            });
          }
        });
        resolve();
      } catch (ex) {
        reject(ex);
      }
    });
 }

 public stopEventUpdates(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.cmPedometer.stopPedometerEventUpdates();
        resolve();
      } catch (ex) {
        reject(ex);
      }
    });
  }

}