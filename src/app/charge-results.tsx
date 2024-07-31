import { CORRECTION_FACTOR, EVChargeCalculatorConfig, useEVChargeCalculator } from "@/features/charge-price-calculator";
import { Box, Card, Grid, Typography } from "@mui/material";
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
      <Typography variant="h2" component="h2" textAlign="center" gutterBottom>
        Results
      </Typography>

      <Typography fontStyle="italic" my={4}>
        This calculator uses a correction factor of {((CORRECTION_FACTOR - 1) * 100).toFixed(0)}% in order to better
        reflect real charging values and side factors (such as efficiency, battery temperature, etc.)
      </Typography>

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
          <ChargeChart chargeSummary={summary} />
        </Grid>
      </Grid>
    </Box>
  );
}
