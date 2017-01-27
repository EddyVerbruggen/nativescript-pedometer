"use strict";
var pedometer_common_1 = require("./pedometer.common");
var Pedometer = (function (_super) {
    __extends(Pedometer, _super);
    function Pedometer() {
        var _this = _super.call(this) || this;
        _this.cmPedometer = CMPedometer.new();
        return _this;
    }
    Pedometer.prototype.isStepCountingAvailable = function () {
        return new Promise(function (resolve, reject) {
            resolve(typeof CMPedometer.isStepCountingAvailable === "function" &&
                CMPedometer.isStepCountingAvailable());
        });
    };
    Pedometer.prototype.isDistanceAvailable = function () {
        return new Promise(function (resolve, reject) {
            resolve(typeof CMPedometer.isDistanceAvailable === "function" &&
                CMPedometer.isDistanceAvailable());
        });
    };
    Pedometer.prototype.isFloorCountingAvailable = function () {
        return new Promise(function (resolve, reject) {
            resolve(typeof CMPedometer.isFloorCountingAvailable === "function" &&
                CMPedometer.isFloorCountingAvailable());
        });
    };
    Pedometer.prototype.isPaceAvailable = function () {
        return new Promise(function (resolve, reject) {
            resolve(typeof CMPedometer.isPaceAvailable === "function" &&
                CMPedometer.isPaceAvailable());
        });
    };
    Pedometer.prototype.isCadenceAvailable = function () {
        return new Promise(function (resolve, reject) {
            resolve(typeof CMPedometer.isCadenceAvailable === "function" &&
                CMPedometer.isCadenceAvailable());
        });
    };
    Pedometer.prototype.isEventTrackingAvailable = function () {
        return new Promise(function (resolve, reject) {
            resolve(typeof CMPedometer.isPedometerEventTrackingAvailable === "function" &&
                CMPedometer.isPedometerEventTrackingAvailable());
        });
    };
    Pedometer.prototype.getStepUpdate = function (cmPedometerData) {
        return {
            startDate: cmPedometerData.startDate,
            endDate: cmPedometerData.endDate,
            steps: cmPedometerData.numberOfSteps,
            distance: cmPedometerData.distance,
            floorsAscended: cmPedometerData.floorsAscended,
            floorsDescended: cmPedometerData.floorsDescended,
            currentPace: cmPedometerData.currentPace,
            currentCadence: cmPedometerData.currentCadence,
            averageActivePace: cmPedometerData.averageActivePace
        };
    };
    Pedometer.prototype.query = function (arg) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                if (!arg || !arg.fromDate) {
                    reject("fromDate is required");
                    return;
                }
                var fromDate = arg.fromDate;
                var toDate = arg.toDate || new Date();
                var that_1 = _this;
                _this.cmPedometer.queryPedometerDataFromDateToDateWithHandler(fromDate, toDate, function (cmPedometerData, error) {
                    if (error) {
                        reject(error.localizedDescription);
                    }
                    else {
                        resolve(that_1.getStepUpdate(cmPedometerData));
                    }
                });
            }
            catch (ex) {
                reject(ex);
            }
        });
    };
    Pedometer.prototype.startUpdates = function (arg) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                if (!arg || typeof arg.onUpdate !== "function") {
                    reject("onUpdate argument is required");
                    return;
                }
                var fromDate = arg.fromDate || new Date();
                var that_2 = _this;
                _this.cmPedometer.startPedometerUpdatesFromDateWithHandler(fromDate, function (cmPedometerData, error) {
                    if (error) {
                        reject(error.localizedDescription);
                    }
                    else {
                        arg.onUpdate(that_2.getStepUpdate(cmPedometerData));
                    }
                });
                resolve();
            }
            catch (ex) {
                reject(ex);
            }
        });
    };
    Pedometer.prototype.stopUpdates = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                _this.cmPedometer.stopPedometerUpdates();
                resolve();
            }
            catch (ex) {
                reject(ex);
            }
        });
    };
    Pedometer.prototype.startEventUpdates = function (arg) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                if (typeof _this.cmPedometer.startPedometerEventUpdatesWithHandler !== "function") {
                    reject("Not supported");
                    return;
                }
                ;
                if (!arg || typeof arg.onUpdate !== "function") {
                    reject("onUpdate argument is required");
                    return;
                }
                _this.cmPedometer.startPedometerEventUpdatesWithHandler(function (cmPedometerEvent, error) {
                    if (error) {
                        reject(error.localizedDescription);
                    }
                    else {
                        var isPaused = cmPedometerEvent.type === 0;
                        arg.onUpdate({
                            type: isPaused ? "pause" : "resume",
                            date: cmPedometerEvent.date
                        });
                    }
                });
                resolve();
            }
            catch (ex) {
                reject(ex);
            }
        });
    };
    Pedometer.prototype.stopEventUpdates = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                _this.cmPedometer.stopPedometerEventUpdates();
                resolve();
            }
            catch (ex) {
                reject(ex);
            }
        });
    };
    return Pedometer;
}(pedometer_common_1.Common));
exports.Pedometer = Pedometer;
//# sourceMappingURL=pedometer.ios.js.map