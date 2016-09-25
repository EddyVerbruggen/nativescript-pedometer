export interface PedometerUpdate {
  /**
   * This is when recording of the currently returned data was started.
   */
  startDate: Date;
  /**
   * This is when recording of the currently returned data was ended (usually: now).
   */
  endDate: Date;
  /**
   * The number of steps taken between startDate and endDate.
   */
  steps: number;
  /**
   * The distance covered in meters between startDate and endDate.
   */
  distance?: number;
  /**
   * The number of floors ascended between startDate and endDate.
   * iOS only.
   */
  floorsAscended?: number;
  /**
   * The number of floors descended between startDate and endDate.
   * iOS only.
   */
  floorsDescended?: number;
  /**
   * The current pace in seconds per meter.
   * iOS 9+ only.
   */
  currentPace?: number;
  /**
   * The current cadence in steps per second.
   * iOS 9+ only.
   */
  currentCadence?: number;
  /**
   * The average pace while active in seconds per meter between startDate and endDate.
   * iOS 10+ only.
   */
  averageActivePace?: number;
}

export interface PedometerEventUpdate {
  type: string;
  date: Date;
}

export interface PedometerStartUpdatesOptions {
  /**
   * Since what date/time do you want to receive updates?
   * Default: now. 
   */
  fromDate?: Date;
  /**
   * Since this method will continuously return data we can't use a Promise,
   * so pass in this callback function instread.
   */
  onUpdate: (data: PedometerUpdate) => void;
}

export interface PedometerStartEventUpdatesOptions {
  /**
   * Since this method will continuously return data we can't use a Promise,
   * so pass in this callback function instread.
   */
  onUpdate: (data: PedometerEventUpdate) => void;
}

export interface PedometerQueryOptions {
  /**
   * Since what date/time do you want to receive all data?
   */
  fromDate: Date;
  /**
   * Until what date/time do you want to receive all data?
   * Default: now. 
   */
  toDate?: Date;
}

export class Common {
  constructor() {
  }
}