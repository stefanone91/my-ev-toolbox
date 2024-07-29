import { ChargeCurveStep } from "../vehicles";

export interface ChargeSummaryStep extends ChargeCurveStep {
  chargedKwh: number;
  seconds: number;
  cumulativePricePerKwh: number;
  cumulativePricePerMinute: number;
  cumulativePrice: number;
}

export type EVChargeCalculatorConfig = {
  batteryCapacity: number;
  chargeCurve: ChargeCurveStep[];
  startPercentage: number;
  endPercentage: number;
  pricePerMinute?: number;
  pricePerKwh?: number;
};
