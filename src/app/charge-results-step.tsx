import { useGetVehicleQuery } from "@/features/vehicles";
import { Box, CircularProgress, Paper } from "@mui/material";
import { FormInputs } from "./charge-details-step";
import { ChargeResults } from "./charge-results";

interface Props {
  formData: FormInputs;
}

export function ChargeResultsStep({ formData }: Props) {
  const { data: vehicle, isFetching } = useGetVehicleQuery(formData.car._id);

  return (
    <Paper>
      <Box p={4}>
        {isFetching ? (
          <Box display="flex" justifyContent="center" py={5}>
            <CircularProgress />
          </Box>
        ) : formData && vehicle ? (
          <ChargeResults
            {...formData}
            batteryCapacity={vehicle.battery.netCapacity || 0}
            chargeCurve={vehicle.charging.chargeCurve || []}
          />
        ) : null}
      </Box>
    </Paper>
  );
}
