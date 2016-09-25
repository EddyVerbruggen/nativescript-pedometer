import {Observable} from "data/observable";
import {Pedometer} from "nativescript-pedometer";
import * as dialogs from "ui/dialogs";

declare var CMPedometer, CMPedometerEventTypePause, CMPedometerEventTypeResume, NSDate;

let cmPedometer;

export class HelloWorldModel extends Observable {
  public error: string;

  public event_type: string;
  public event_date: string;

  public step_startDate: string;
  public step_endDate: string;
  public step_steps: number;
  public step_distance: number;
  public step_floorsAsc: number;
  public step_floorsDesc: number;
  public step_currentPace: number;
  public step_currentCadence: number;
  public step_avgActivePace: number;

  private pedometer: Pedometer;

  constructor() {
    super();
    this.pedometer = new Pedometer();
  }

  private round(value: number, decimals: number) {
    return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
  }

  private formatDate(value: Date) {
    return value.toLocaleTimeString("en-us");
  }

  public doCheckStepsAvailable() {
    this.pedometer.isStepCountingAvailable().then((avail) => {
      dialogs.alert({okButtonText: "OK", title: "Available?", message: avail ? "Yes" : "No"});
    });
  }

  public doCheckDistanceAvailable() {
    this.pedometer.isDistanceAvailable().then((avail) => {
      dialogs.alert({okButtonText: "OK", title: "Available?", message: avail ? "Yes" : "No"});
    });
  }

  public doCheckFloorCountingAvailable() {
    this.pedometer.isFloorCountingAvailable().then((avail) => {
      dialogs.alert({okButtonText: "OK", title: "Available?", message: avail ? "Yes" : "No"});
    });
  }

  public doCheckPaceAvailable() {
    this.pedometer.isPaceAvailable().then((avail) => {
      dialogs.alert({okButtonText: "OK", title: "Available?", message: avail ? "Yes" : "No"});
    });
  }

  public doCheckCadenceAvailable() {
    this.pedometer.isCadenceAvailable().then((avail) => {
      dialogs.alert({okButtonText: "OK", title: "Available?", message: avail ? "Yes" : "No"});
    });
  }

  public doCheckEventTrackingAvailable() {
    this.pedometer.isEventTrackingAvailable().then((avail) => {
      dialogs.alert({okButtonText: "OK", title: "Available?", message: avail ? "Yes" : "No"});
    });
  }

  public doQueryStepsLastHour() {
    let that = this;
    this.pedometer.query({
      fromDate: new Date(new Date().getTime() - (1000 * 60 * 60)),
      toDate: new Date()
    }).then((result) => {
      that.updateStepsUI(result, that);
    }, (err) => {
      dialogs.alert({okButtonText: "OK", title: "Error", message: err});
    });
  }

  public doQueryStepsToday() {
    let that = this;
    let midnight = new Date();
    midnight.setHours(0, 0, 0, 0);
    this.pedometer.query({
      fromDate: midnight,
      toDate: new Date()
    }).then((result) => {
      that.updateStepsUI(result, that);
    }, (err) => {
      dialogs.alert({okButtonText: "OK", title: "Error", message: err});
    });
  }

  public doStartUpdates() {
    let that = this;
    this.pedometer.startUpdates({
      fromDate: new Date(), // optional, default: now
      onUpdate: function(result) {
        that.updateStepsUI(result, that);
      }
    }).then(() => {
      dialogs.alert({okButtonText: "OK", title: "", message: "Pedometer updates started.\n\nRotate your device to force UI updates if things look stuck.."});
    }, (err) => {
      dialogs.alert({okButtonText: "OK", title: "Error", message: err});
    });
  }

  private updateStepsUI(result, that) {
    console.log("Pedometer update: " + JSON.stringify(result));

    that.set("step_startDate", that.formatDate(result.startDate));
    that.set("step_endDate", that.formatDate(result.endDate));
    that.set("step_steps", result.steps);
    that.set("step_distance", that.round(result.distance, 3) + " meter");
    that.set("step_floorsAsc", result.floorsAscended);
    that.set("step_floorsDesc", result.floorsDescended);
    that.set("step_currentPace", that.round((result.currentPace ? result.currentPace : 0), 3) + " seconds / meter");
    that.set("step_currentCadence", that.round((result.currentCadence ? result.currentCadence : 0), 3) + " steps / second");
    that.set("step_avgActivePace", that.round((result.averageActivePace ? result.averageActivePace : 0), 3) + " seconds / meter");
  }

  public doStopUpdates() {
    this.pedometer.stopUpdates().then(() => {
      dialogs.alert({okButtonText: "OK", title: "", message: "Pedometer updates stopped"});
    }, (err) => {
      dialogs.alert({okButtonText: "OK", title: "Error", message: err});
    });
  }

  public doStartEventUpdates() {
    let that = this;
    this.pedometer.startEventUpdates({
      onUpdate: function(result) {
        that.set("event_date", that.formatDate(result.date));
        that.set("event_type", result.type);
      }
    }).then(() => {
      dialogs.alert({okButtonText: "OK", title: "", message: "Pedometer event updates started.\n\nRotate your device to force UI updates if things look stuck.."});
    }, (err) => {
      dialogs.alert({okButtonText: "OK", title: "Error", message: err});
    });
  }

  public doStopEventUpdates() {
    this.pedometer.stopEventUpdates().then(() => {
      dialogs.alert({okButtonText: "OK", title: "", message: "Pedometer event updates stopped"});
    }, (err) => {
      dialogs.alert({okButtonText: "OK", title: "Error", message: err});
    });
  }
}