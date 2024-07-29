import { useEffect, useState } from "react";
import { ChargeSummaryStep, EVChargeCalculatorConfig } from "./models";

/**
 * A correction factor that considers average dispersion during charge process
 */
export const CORRECTION_FACTOR = 1.1;

export function useEVChargeCalculator({
  batteryCapacity,
  chargeCurve,
  startPercentage,
  endPercentage,
  pricePerMinute,
  pricePerKwh,
}: EVChargeCalculatorConfig) {
  const [error, setError] = useState<string | undefined>();
  const [summary, setSummary] = useState<ChargeSummaryStep[]>([]);
  const [chargedKwh, setChargedKwh] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [averagePricePerKwh, setAveragePricePerKwh] = useState<number>(0);

  // Calculate summary array
  useEffect(() => {
    if (!batteryCapacity) {
      setError("Missing battery capacity");
      return;
    }
    if (!chargeCurve?.length) {
      setError("Missing chargeCurve");
      return;
    }
    if (
      typeof startPercentage !== "number" ||
      startPercentage < 0 ||
      startPercentage > 100 ||
      startPercentage > endPercentage
    ) {
      setError("Invalid startPercentage");
      return;
    }
    if (
      typeof endPercentage !== "number" ||
      endPercentage < 0 ||
      endPercentage > 100 ||
      endPercentage < startPercentage
    ) {
      setError("Invalid endPercentage");
      return;
    }
    if (!pricePerKwh && !pricePerMinute) {
      setError("Invalid price(s)");
      return;
    }

    const results: ChargeSummaryStep[] = [];

    for (let i = 0; i < chargeCurve.length; i++) {
      const element = chargeCurve[i];
      const prevElement: ChargeSummaryStep = results[i - 1];
      if (element.soc <= startPercentage || !prevElement) {
        results.push({
          ...element,
          chargedKwh: 0,
          seconds: 0,
          cumulativePricePerKwh: 0,
          cumulativePricePerMinute: 0,
          cumulativePrice: 0,
        });
        continue;
      }
      if (element.soc > endPercentage) {
        results.push({
          ...prevElement,
          soc: element.soc,
          kw: element.kw,
        });
        continue;
      }
      const chargedKwh = (((element.soc - startPercentage) * batteryCapacity) / 100) * CORRECTION_FACTOR;
      const seconds = prevElement.seconds + ((chargedKwh - prevElement.chargedKwh) * 3600) / element.kw;
      const cumulativePricePerKwh = chargedKwh * (pricePerKwh || 0);
      const cumulativePricePerMinute = (seconds / 60) * (pricePerMinute || 0);
      const cumulativePrice = cumulativePricePerKwh + cumulativePricePerMinute;
      results.push({
        ...element,
        chargedKwh,
        seconds,
        cumulativePricePerKwh,
        cumulativePricePerMinute,
        cumulativePrice,
      });
    }

    setError(undefined);
    setSummary(results);
  }, [batteryCapacity, chargeCurve, startPercentage, pricePerMinute, pricePerKwh, endPercentage]);

  // Calculate final values upon summary
  useEffect(() => {
    const finalStep = summary.find((x) => x.soc === endPercentage);
    if (!finalStep) {
      setError("Missing summary step");
      return;
    }
    const { chargedKwh, cumulativePrice, seconds } = finalStep;
    setChargedKwh(chargedKwh || 0);
    setTotalPrice(cumulativePrice || 0);
    setAveragePricePerKwh(cumulativePrice ? cumulativePrice / chargedKwh : 0);
    setTotalTime(seconds);
    setError(undefined);
  }, [endPercentage, summary]);

  return {
    chargedKwh,
    totalPrice,
    averagePricePerKwh,
    totalTime,
    summary,
    error,
  };
}
