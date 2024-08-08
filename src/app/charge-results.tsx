import { CORRECTION_FACTOR, EVChargeCalculatorConfig, useEVChargeCalculator } from "@/features/charge-price-calculator";
import { Alert, Box, Card, Grid, Typography } from "@mui/material";
import { ChargeChart } from "./charge-chart";
import { useEffect, useRef } from "react";

export function ChargeResults(props: EVChargeCalculatorConfig) {
  const divRef = useRef<HTMLDivElement>();

  const { chargedKwh, totalPrice, averagePricePerKwh, totalTime, summary, error } = useEVChargeCalculator(props);
  const results = [
    { title: "Total price", value: `${totalPrice.toFixed(2)}€`, color: "secondary" },
    { title: "Avg price per kW", value: `${averagePricePerKwh.toFixed(2)}€/kW`, color: "success" },
    { title: "Charged kW", value: `${chargedKwh.toFixed(2)}kW`, color: "primary" },
    { title: "Time", value: `${new Date(totalTime * 1000).toISOString().substring(11, 19)}`, color: "success" },
  ];

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <Box ref={divRef}>
      <Box mb={4}>
        <Typography variant="h2" component="h2" textAlign="center">
          Results
        </Typography>
      </Box>

      {!props.chargeCurve?.length && (
        <Box mb={2}>
          <Alert severity="error">The selected EV has no charging curve data. No results will be shown.</Alert>
        </Box>
      )}

      <Box mb={4}>
        <Typography fontStyle="italic">
          This calculator uses a correction factor of {((CORRECTION_FACTOR - 1) * 100).toFixed(0)}% in order to better
          reflect real charging values and side factors (such as efficiency, battery temperature, etc.)
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {results.map((x) => (
          <Grid key={x.title} item xs={12} sm={6} md={3}>
            <Card variant="outlined" sx={{ p: 2 }}>
              <Typography component="h5" variant="body1" color="primary" gutterBottom>
                {x.title}
              </Typography>
              <Typography color="text.primary" component="span" variant="h5">
                {x.value}
              </Typography>
            </Card>
          </Grid>
        ))}

        <Grid item xs={12}>
          <ChargeChart chargingStationPower={props.chargingStationPower} chargeSummary={summary} />
        </Grid>
      </Grid>
    </Box>
  );
}
