export type OptionStatus = "n/a" | "standard" | "optional";

export interface Vehicle {
  _id: string;
  brand: string;
  model: string;
  variant: string;
  type?: string;
  worldPremiere?: Date;
  deliveryStart?: Date;
  modelStatus?: "discontinued" | "active";
  rangeAndConsumption: {
    wltpRange?: number;
    wltpConsumption?: number;
    wltpConsumptionIncludingChargingLoss?: number;
    epaRange?: number;
    epaConsumption?: number;
  };
  performance: {
    topSpeed?: number;
    power?: number;
    torque?: number;
    acceleration?: number;
  };
  drivetrain: {
    drive?: string;
    motorSetup?: string;
    motorTechnology?: string;
  };
  brakesAndRegen: {
    frontBrakeType?: string;
    rearBrakeType?: string;
    frontDiscDiameter?: string;
    rearDiscDiameter?: string;
    blendedBrakes?: OptionStatus;
    liftUpRegen?: OptionStatus;
    liftUpRegenStoppingModes?: OptionStatus;
    liftUpRegenLevels?: OptionStatus;
    coasting?: OptionStatus;
    adaptiveRegenWhenCoasting?: OptionStatus;
  };
  suspension: {
    suspensionOptions?: string;
    adaptiveDampingFront?: OptionStatus;
    adaptiveDampingRear?: OptionStatus;
    suspensionTypeFront?: string;
    suspensionTypeRear?: string;
    springTypeFront?: string;
    springTypeRear?: string;
    adjustableHeightFront?: OptionStatus;
    adjustableHeightRear?: OptionStatus;
    groundClearance?: string;
  };
  sizeAndWeight: {
    length?: string;
    height?: string;
    widthExcludingMirrors?: string;
    widthIncludingMirrors?: string;
    wheelbase?: string;
    turningCircle?: string;
    curbWeight?: string;
    maxWeight?: string;
    maxRoofLoad?: string;
    maxWeightBrakedTrailer?: string;
    trunkCapacity?: string;
    trunkCapacitySeatDown?: string;
  };
  ui: {
    headUpDisplay?: OptionStatus;
    voiceControl?: OptionStatus;
    gestureControl?: OptionStatus;
    driverDisplay?: string;
    infotainmentScreen?: string;
    inCarNavigation?: OptionStatus;
    appleCarPlay?: OptionStatus;
    androidAuto?: OptionStatus;
  };
  lights: {
    ledMatrixHeadlights?: OptionStatus;
  };
  driverAssistSystems: {
    abs?: OptionStatus;
    automaticEmergencyBraking?: OptionStatus;
    automaticEmergencySteering?: OptionStatus;
    crossTrafficAssist?: OptionStatus;
    drowsinessAlert?: OptionStatus;
    electronicStabilityControl?: OptionStatus;
    blindSpotMonitoring?: OptionStatus;
    exitWarning?: OptionStatus;
    forwardCollisionWarning?: OptionStatus;
    laneDepartureWarning?: OptionStatus;
    laneKeepingAssist?: OptionStatus;
    leftTurnCrashAvoidance?: OptionStatus;
    nightVision?: OptionStatus;
    autoSteer?: OptionStatus;
  };
  battery: {
    grossCapacity?: number;
    netCapacity?: number;
    cellChemistry?: string;
  };
  charging: {
    chargeCurve?: ChargeCurveStep[];
    maxDcChargingPower?: number;
    averageDcChargingPower0100?: number;
    averageDcChargingPower10100?: number;
    averageDcChargingPower1080?: number;
    batteryHeatingNavigatingToCharger?: OptionStatus;
    manualBatteryHeating?: OptionStatus;
  };
  seats: {
    numberOfSeats?: number;
    frontSeatsOptions?: number;
    heatingFrontSeats?: OptionStatus;
    adjustableThighSupport?: OptionStatus;
    ventilationFrontSeats?: OptionStatus;
    massageFrontSeats?: OptionStatus;
    heatingSecondRow?: OptionStatus;
    ventilationSecondRowSeats?: OptionStatus;
    massageSecondRowSeats?: OptionStatus;
  };
  exteriorDesign: {
    paintColorOptions?: number;
    wheelOptions?: number;
    wheelSizes?: string;
  };
}

export interface ChargeCurveStep {
  soc: number;
  kw: number;
}
export type VehiclePartial = Pick<Vehicle, "_id" | "brand" | "model" | "variant">;
