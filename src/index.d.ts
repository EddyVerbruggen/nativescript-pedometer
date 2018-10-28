/**
 * iOS and Android apis should match.
 * It doesn't matter if you export `.ios` or `.android`, either one but only one.
 */
export * from "./pedometer.ios";

// Export any shared classes, constants, etc.
export * from "./pedometer.common";