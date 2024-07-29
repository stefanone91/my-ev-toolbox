import { renderHook } from "@testing-library/react";
import { useEVChargeCalculator } from "./hooks";
import { ChargeSpeed, EVChargeCalculatorConfig } from "./models";

describe("useEVChargeCalculator", () => {
  it("should handle correct values successfully", () => {
    const data: EVChargeCalculatorConfig = {
      batteryCapacity: 59,
      startPercentage: 10,
      endPercentage: 70,
      pricePerMinute: 0.3,
      pricePerKwh: 0.3,
      chargeCurve: getChargeCurve(),
    };
    const { result } = renderHook(() => useEVChargeCalculator(data));
    expect(result.current.chargedKwh.toFixed(2)).toBe("38.94");
    expect(result.current.totalPrice.toFixed(2)).toBe("19.25");
    expect(result.current.averagePricePerKwh.toFixed(2)).toBe("0.49");
    for (let i = 0; i < data.startPercentage; i++) {
      expect(result.current.summary[i].chargedKwh).toBe(0);
    }
    expect(result.current.error).not.toBeDefined();
  });

  it("should handle undefined pricePerMinute but valid pricePerKwh successfully", () => {
    const data: EVChargeCalculatorConfig = {
      batteryCapacity: 59,
      startPercentage: 10,
      endPercentage: 70,
      pricePerMinute: undefined,
      pricePerKwh: 0.3,
      chargeCurve: getChargeCurve(),
    };
    const { result } = renderHook(() => useEVChargeCalculator(data));
    expect(result.current.chargedKwh.toFixed(2)).toBe("38.94");
    expect(result.current.totalPrice.toFixed(2)).toBe("11.68");
    expect(result.current.averagePricePerKwh.toFixed(2)).toBe("0.30");
    expect(result.current.error).not.toBeDefined();
  });

  it("should handle valid pricePerMinute but undefined pricePerKwh successfully", () => {
    const data: EVChargeCalculatorConfig = {
      batteryCapacity: 59,
      startPercentage: 10,
      endPercentage: 70,
      pricePerMinute: 0.3,
      pricePerKwh: undefined,
      chargeCurve: getChargeCurve(),
    };
    const { result } = renderHook(() => useEVChargeCalculator(data));
    expect(result.current.chargedKwh.toFixed(2)).toBe("38.94");
    expect(result.current.totalPrice.toFixed(2)).toBe("7.57");
    expect(result.current.averagePricePerKwh.toFixed(2)).toBe("0.19");
    expect(result.current.error).not.toBeDefined();
  });

  it("should handle batteryCapacity being invalid", () => {
    const data: EVChargeCalculatorConfig = {
      batteryCapacity: 0,
      startPercentage: 10,
      endPercentage: 70,
      pricePerMinute: 0.3,
      pricePerKwh: 0.3,
      chargeCurve: getChargeCurve(),
    };
    const { result } = renderHook(() => useEVChargeCalculator(data));
    expect(result.current.totalPrice).toBe(0);
    expect(result.current.averagePricePerKwh).toBe(0);
  });

  it("should handle endPercentage beyond range", () => {
    const data: EVChargeCalculatorConfig = {
      batteryCapacity: 59,
      startPercentage: 10,
      endPercentage: 110, // beyond the range
      pricePerMinute: 0.3,
      pricePerKwh: 0.3,
      chargeCurve: getChargeCurve(),
    };
    const { result } = renderHook(() => useEVChargeCalculator(data));
    expect(result.current.chargedKwh).toBe(0);
    expect(result.current.totalPrice).toBe(0);
    expect(result.current.averagePricePerKwh).toBe(0);
    expect(result.current.error).toBeDefined();
  });

  it("should handle startPercentage beyond range", () => {
    const data: EVChargeCalculatorConfig = {
      batteryCapacity: 59,
      startPercentage: 110, // beyond the range
      endPercentage: 70,
      pricePerMinute: 0.3,
      pricePerKwh: 0.3,
      chargeCurve: getChargeCurve(),
    };
    const { result } = renderHook(() => useEVChargeCalculator(data));
    expect(result.current.chargedKwh).toBe(0);
    expect(result.current.totalPrice).toBe(0);
    expect(result.current.averagePricePerKwh).toBe(0);
    expect(result.current.error).toBeDefined();
  });

  it("should handle startPercentage and endPercentage being the same", () => {
    const data: EVChargeCalculatorConfig = {
      batteryCapacity: 59,
      startPercentage: 50,
      endPercentage: 50,
      pricePerMinute: 0.3,
      pricePerKwh: 0.3,
      chargeCurve: getChargeCurve(),
    };
    const { result } = renderHook(() => useEVChargeCalculator(data));
    expect(result.current.chargedKwh).toBe(0);
    expect(result.current.totalPrice).toBe(0);
    expect(result.current.averagePricePerKwh).toBe(0);
  });

  it("should handle empty chargeCurve", () => {
    const data: EVChargeCalculatorConfig = {
      batteryCapacity: 59,
      startPercentage: 10,
      endPercentage: 70,
      pricePerMinute: 0.3,
      pricePerKwh: 0.3,
      chargeCurve: [],
    };
    const { result } = renderHook(() => useEVChargeCalculator(data));
    expect(result.current.chargedKwh).toBe(0);
    expect(result.current.totalPrice).toBe(0);
    expect(result.current.averagePricePerKwh).toBe(0);
    expect(result.current.error).toBeDefined();
  });

  it("should handle pricePerMinute and pricePerKwh being both invalid", () => {
    const data: EVChargeCalculatorConfig = {
      batteryCapacity: 59,
      startPercentage: 10,
      endPercentage: 70,
      pricePerMinute: 0,
      pricePerKwh: 0,
      chargeCurve: getChargeCurve(),
    };
    const { result } = renderHook(() => useEVChargeCalculator(data));
    expect(result.current.totalPrice).toBe(0);
    expect(result.current.averagePricePerKwh).toBe(0);
  });
});

function getChargeCurve(): ChargeSpeed[] {
  return [
    { soc: 0, kw: 50 },
    { soc: 1, kw: 62 },
    { soc: 2, kw: 74 },
    { soc: 3, kw: 86 },
    { soc: 4, kw: 98 },
    { soc: 5, kw: 110 },
    { soc: 6, kw: 122 },
    { soc: 7, kw: 133 },
    { soc: 8, kw: 145 },
    { soc: 9, kw: 157 },
    { soc: 10, kw: 169 },
    { soc: 11, kw: 168 },
    { soc: 12, kw: 160 },
    { soc: 13, kw: 151 },
    { soc: 14, kw: 146 },
    { soc: 15, kw: 141 },
    { soc: 16, kw: 138 },
    { soc: 17, kw: 135 },
    { soc: 18, kw: 133 },
    { soc: 19, kw: 130 },
    { soc: 20, kw: 129 },
    { soc: 21, kw: 128 },
    { soc: 22, kw: 127 },
    { soc: 23, kw: 126 },
    { soc: 24, kw: 125 },
    { soc: 25, kw: 124 },
    { soc: 26, kw: 124 },
    { soc: 27, kw: 123 },
    { soc: 28, kw: 122 },
    { soc: 29, kw: 121 },
    { soc: 30, kw: 120 },
    { soc: 31, kw: 119 },
    { soc: 32, kw: 116 },
    { soc: 33, kw: 115 },
    { soc: 34, kw: 114 },
    { soc: 35, kw: 112 },
    { soc: 36, kw: 110 },
    { soc: 37, kw: 109 },
    { soc: 38, kw: 108 },
    { soc: 39, kw: 106 },
    { soc: 40, kw: 104 },
    { soc: 41, kw: 103 },
    { soc: 42, kw: 101 },
    { soc: 43, kw: 100 },
    { soc: 44, kw: 97 },
    { soc: 45, kw: 95 },
    { soc: 46, kw: 94 },
    { soc: 47, kw: 92 },
    { soc: 48, kw: 90 },
    { soc: 49, kw: 88 },
    { soc: 50, kw: 86 },
    { soc: 51, kw: 84 },
    { soc: 52, kw: 82 },
    { soc: 53, kw: 80 },
    { soc: 54, kw: 79 },
    { soc: 55, kw: 77 },
    { soc: 56, kw: 75 },
    { soc: 57, kw: 73 },
    { soc: 58, kw: 71 },
    { soc: 59, kw: 70 },
    { soc: 60, kw: 68 },
    { soc: 61, kw: 66 },
    { soc: 62, kw: 65 },
    { soc: 63, kw: 64 },
    { soc: 64, kw: 62 },
    { soc: 65, kw: 60 },
    { soc: 66, kw: 58 },
    { soc: 67, kw: 57 },
    { soc: 68, kw: 56 },
    { soc: 69, kw: 55 },
    { soc: 70, kw: 53 },
    { soc: 71, kw: 52 },
    { soc: 72, kw: 51 },
    { soc: 73, kw: 50 },
    { soc: 74, kw: 48 },
    { soc: 75, kw: 47 },
    { soc: 76, kw: 46 },
    { soc: 77, kw: 46 },
    { soc: 78, kw: 45 },
    { soc: 79, kw: 44 },
    { soc: 80, kw: 43 },
    { soc: 81, kw: 43 },
    { soc: 82, kw: 42 },
    { soc: 83, kw: 41 },
    { soc: 84, kw: 40 },
    { soc: 85, kw: 39 },
    { soc: 86, kw: 38 },
    { soc: 87, kw: 37 },
    { soc: 88, kw: 37 },
    { soc: 89, kw: 35 },
    { soc: 90, kw: 34 },
    { soc: 91, kw: 31 },
    { soc: 92, kw: 28 },
    { soc: 93, kw: 25 },
    { soc: 94, kw: 22 },
    { soc: 95, kw: 20 },
    { soc: 96, kw: 17 },
    { soc: 97, kw: 14 },
    { soc: 98, kw: 11 },
    { soc: 99, kw: 8 },
    { soc: 100, kw: 5 },
  ];
}
