"use strict";
var pedometer_common_1 = require("./pedometer.common");
var utils = require("utils/utils");
var Pedometer = (function (_super) {
    __extends(Pedometer, _super);
    function Pedometer() {
        _super.call(this);
        this.sensorManager = utils.ad.getApplicationContext().getSystemService(android.content.Context.SENSOR_SERVICE);
    }
    Pedometer.prototype.isStepCountingAvailable = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var sensors = _this.sensorManager.getSensorList("android.sensor.step_counter");
            resolve(sensors !== null && sensors.length > 0);
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
        return new Promise(function (resolve, reject) {
            try {
                if (!arg || typeof arg.onUpdate !== "function") {
                    reject("onUpdate argument is required");
                    return;
                }
                resolve();
            }
            catch (ex) {
                reject(ex);
            }
        });
    };
    Pedometer.prototype.stopUpdates = function () {
        return new Promise(function (resolve, reject) {
            try {
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
