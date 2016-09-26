"use strict";
var pedometer_common_1 = require("./pedometer.common");
var utils = require("utils/utils");
var STATE;
(function (STATE) {
    STATE[STATE["STARTING"] = 0] = "STARTING";
    STATE[STATE["STARTED"] = 1] = "STARTED";
    STATE[STATE["ERROR_FAILED_TO_START"] = 2] = "ERROR_FAILED_TO_START";
    STATE[STATE["STOPPED"] = 3] = "STOPPED";
})(STATE || (STATE = {}));
var Pedometer = (function (_super) {
    __extends(Pedometer, _super);
    function Pedometer() {
        _super.call(this);
        this.startSteps = 0;
        this.startTimestamp = 0;
        this.sensorManager = utils.ad.getApplicationContext().getSystemService(android.content.Context.SENSOR_SERVICE);
    }
    Pedometer.prototype.isStepCountingAvailable = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var sensors = _this.sensorManager.getSensorList(19);
            resolve(sensors.size() > 0);
        });
    };
    Pedometer.prototype.isDistanceAvailable = function () {
        return new Promise(function (resolve, reject) {
            resolve(false);
        });
    };
    Pedometer.prototype.isFloorCountingAvailable = function () {
        return new Promise(function (resolve, reject) {
            resolve(false);
        });
    };
    Pedometer.prototype.isPaceAvailable = function () {
        return new Promise(function (resolve, reject) {
            resolve(false);
        });
    };
    Pedometer.prototype.isCadenceAvailable = function () {
        return new Promise(function (resolve, reject) {
            resolve(false);
        });
    };
    Pedometer.prototype.isEventTrackingAvailable = function () {
        return new Promise(function (resolve, reject) {
            resolve(false);
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
                var that_1 = _this;
                var sensors = _this.sensorManager.getSensorList(19);
                if (sensors.size() > 0) {
                    _this.sensor = sensors.get(0);
                    _this.startSteps = 0;
                    _this.startTimestamp = new Date().getTime();
                    _this.sensorEventListener = new android.hardware.SensorEventListener({
                        onSensorChanged: function (sensorEvent) {
                            if (sensorEvent.sensor.getType() === 19) {
                                if (that_1.state === STATE.STOPPED) {
                                    return;
                                }
                                that_1.state = STATE.STARTED;
                                var steps = sensorEvent.values[0];
                                if (that_1.startSteps === 0) {
                                    that_1.startSteps = steps;
                                }
                                steps = steps - that_1.startSteps;
                                console.log("-- onSensorChanged.accuracy: " + sensorEvent.accuracy);
                                console.log("-- onSensorChanged custom start ts: " + that_1.startTimestamp);
                                console.log("-- onSensorChanged custom end ts: " + new Date().getTime());
                                console.log("-- onSensorChanged.steps: " + steps);
                                arg.onUpdate({
                                    startDate: new Date(that_1.startTimestamp),
                                    endDate: new Date(),
                                    steps: steps
                                });
                            }
                        },
                        onAccuracyChanged: function (sensor, accuracy) {
                            console.log("-- onAccuracyChanged: " + accuracy);
                        }
                    });
                    if (_this.sensorManager.registerListener(_this.sensorEventListener, _this.sensor, android.hardware.SensorManager.SENSOR_DELAY_UI)) {
                        _this.state = STATE.STARTING;
                    }
                    else {
                        _this.state = STATE.ERROR_FAILED_TO_START;
                        reject("Failed to start");
                    }
                }
                else {
                    _this.state = STATE.ERROR_FAILED_TO_START;
                    reject("Failed to start - No sensors found to register step counter listening to.");
                }
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
                if (_this.sensorEventListener) {
                    _this.sensorManager.unregisterListener(_this.sensorEventListener);
                    _this.state = STATE.STOPPED;
                }
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
