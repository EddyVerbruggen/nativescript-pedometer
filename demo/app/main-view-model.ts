import { Observable } from "data/observable";
import { Pedometer } from "nativescript-pedometer";
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
    var strnumber = `${value}e${decimals}`;
    var numround = Math.round(Number(strnumber));
    var strfinal = `${numround}e-${decimals}`;
    return Number(strfinal);
  }

  private formatDate(value: Date) {
    return value.toLocaleDateString("en-us") + " " + value.toLocaleTimeString("en-us");
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
    this.pedometer.query({
      fromDate: new Date(new Date().getTime() - (1000 * 60 * 60)),
      toDate: new Date()
    }).then((result) => {
      this.updateStepsUI(result);
    }, (err) => {
      dialogs.alert({okButtonText: "OK", title: "Error", message: err});
    });
  }

  public doQueryStepsToday() {
    let midnight = new Date();
    midnight.setHours(0, 0, 0, 0);
    this.pedometer.query({
      fromDate: midnight,
      toDate: new Date()
    }).then((result) => {
      this.updateStepsUI(result);
    }, (err) => {
      dialogs.alert({okButtonText: "OK", title: "Error", message: err});
    });
  }

  public doStartUpdates() {
    const fromDate = new Date(new Date().getTime() - (1000 * 60 * 60 * 24)); // a day ago
    this.pedometer.startUpdates({
      fromDate, // optional, default 'now'
      onUpdate: result => this.updateStepsUI(result)
    }).then(() => {
      dialogs.alert({
        okButtonText: "OK",
        title: "",
        message: "Pedometer updates started.\n\nRotate your device to force UI updates if things look stuck.."
      });
    }, (err) => {
      dialogs.alert({okButtonText: "OK", title: "Error", message: err});
    });
  }

  private updateStepsUI(result) {
    console.log("Pedometer update: " + JSON.stringify(result));

    this.set("step_startDate", this.formatDate(result.startDate));
    this.set("step_endDate", this.formatDate(result.endDate));
    this.set("step_steps", result.steps);
    this.set("step_distance", this.round(result.distance, 3) + " meter");
    this.set("step_floorsAsc", result.floorsAscended);
    this.set("step_floorsDesc", result.floorsDescended);
    this.set("step_currentPace", this.round((result.currentPace ? result.currentPace : 0), 3) + " seconds / meter");
    this.set("step_currentCadence", this.round((result.currentCadence ? result.currentCadence : 0), 3) + " steps / second");
    this.set("step_avgActivePace", this.round((result.averageActivePace ? result.averageActivePace : 0), 3) + " seconds / meter");
  }

  public doStopUpdates() {
    this.pedometer.stopUpdates().then(() => {
      dialogs.alert({okButtonText: "OK", title: "", message: "Pedometer updates stopped"});
    }, (err) => {
      dialogs.alert({okButtonText: "OK", title: "Error", message: err});
    });
  }

  public doStartEventUpdates() {
    this.pedometer.startEventUpdates({
      onUpdate: result => {
        this.set("event_date", this.formatDate(result.date));
        this.set("event_type", result.type);
      }
    }).then(() => {
      dialogs.alert({
        okButtonText: "OK",
        title: "",
        message: "Pedometer event updates started.\n\nRotate your device to force UI updates if things look stuck.."
      });
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
