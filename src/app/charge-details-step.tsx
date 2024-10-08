"use client";

import { VehiclePartial, useGetVehiclesQuery } from "@/features/vehicles";
import { Autocomplete, Box, Button, Grid, Link, Paper, TextField, Typography } from "@mui/material";
import { useDebounce, useLocalStorage } from "@uidotdev/usehooks";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

export interface FormInputs {
  car: VehiclePartial;
  startPercentage: number;
  endPercentage: number;
  pricePerMinute: number;
  pricePerKwh: number;
  chargingStationPower: number;
}

interface Props {
  onSubmit: (data: FormInputs) => void;
}

export function ChargeDetailsStep({ onSubmit }: Props) {
  const [carLocalStorage, setCarLocalStorage] = useLocalStorage<VehiclePartial | undefined>("car", undefined);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search || "", 300);
  const { data: cars = [], isFetching } = useGetVehiclesQuery(debouncedSearch);

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<FormInputs>({
    defaultValues: {
      car: carLocalStorage,
      startPercentage: 10,
      endPercentage: 80,
      pricePerMinute: 0.3,
      pricePerKwh: 0.3,
      chargingStationPower: 300,
    },
  });

  return (
    <Paper>
      <Box p={4}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="car"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Autocomplete
                    options={cars}
                    value={field.value || null}
                    loading={isFetching}
                    isOptionEqualToValue={(option, value) => option._id === value._id}
                    getOptionLabel={(car) => {
                      const carYear = car.deliveryStart ? " (" + new Date(car.deliveryStart).getFullYear() + ")" : "";
                      return `${car.brand} ${car.variant}${carYear}`;
                    }}
                    getOptionKey={(car) => car._id.toString()}
                    filterOptions={(x) => x}
                    onChange={(evt, value) => {
                      field.onChange(value);
                      if (value) setCarLocalStorage(value);
                    }}
                    onInputChange={(evt, value) => setSearch(value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        margin="normal"
                        label="Choose an EV"
                        placeholder="Type to search..."
                        variant="outlined"
                        fullWidth
                      />
                    )}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Controller
                name="startPercentage"
                control={control}
                rules={{ required: "Start percentage is required", min: 0, max: 100 }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    onChange={(event) => field.onChange(parseInt(event.target.value, 10))}
                    label="Start Percentage (%)"
                    type="number"
                    fullWidth
                    margin="normal"
                    error={!!errors.startPercentage}
                    helperText={errors.startPercentage ? errors.startPercentage.message : ""}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name="endPercentage"
                control={control}
                rules={{ required: "End percentage is required", min: 0, max: 100 }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    onChange={(event) => field.onChange(parseInt(event.target.value, 10))}
                    label="End Percentage (%)"
                    type="number"
                    fullWidth
                    margin="normal"
                    error={!!errors.endPercentage}
                    helperText={errors.endPercentage ? errors.endPercentage.message : ""}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Controller
                name="pricePerMinute"
                control={control}
                rules={{ required: "Price per minute is required", min: 0 }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    onChange={(event) => field.onChange(parseFloat(event.target.value))}
                    label="Price per Minute (€)"
                    type="number"
                    fullWidth
                    margin="normal"
                    error={!!errors.pricePerMinute}
                    helperText={errors.pricePerMinute ? errors.pricePerMinute.message : ""}
                  />
                )}
              />
            </Grid>

            <Grid item xs={6}>
              <Controller
                name="pricePerKwh"
                control={control}
                rules={{ required: "Price per kWh is required", min: 0 }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    onChange={(event) => field.onChange(parseFloat(event.target.value))}
                    label="Price per kWh (€)"
                    type="number"
                    fullWidth
                    margin="normal"
                    error={!!errors.pricePerKwh}
                    helperText={errors.pricePerKwh ? errors.pricePerKwh.message : ""}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="chargingStationPower"
                control={control}
                rules={{ required: "Charging station power is required", min: 0 }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    onChange={(event) => field.onChange(parseInt(event.target.value, 10))}
                    label="Charging station power (kW)"
                    type="number"
                    fullWidth
                    margin="normal"
                    error={!!errors.chargingStationPower}
                    helperText={errors.chargingStationPower ? errors.chargingStationPower.message : ""}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Box mt={3}>
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={!isValid}>
              Process
            </Button>
          </Box>

          <Box textAlign="center" mt={3}>
            <Typography variant="caption" fontStyle="italic">
              Have you found a bug or samething new to suggest?{" "}
              <Link color="primary" href={"https://github.com/stefanone91/my-ev-toolbox/issues/new"} target="_blank">
                Open a Github issue.
              </Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Paper>
  );
}
