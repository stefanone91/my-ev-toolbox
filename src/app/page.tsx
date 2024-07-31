"use client";

import { Box, Container } from "@mui/material";
import { useState } from "react";
import { ChargeDetailsStep, FormInputs } from "./charge-details-step";
import { ChargeResultsStep } from "./charge-results-step";
import { Hero } from "./hero";
import { useIsClient } from "@uidotdev/usehooks";

export default function Home() {
  const [formData, setFormData] = useState<FormInputs | undefined>(undefined);
  const isClient = useIsClient();
  if (isClient === false) {
    return null;
  }

  return (
    <>
      <Hero title="My EV Toolbox" subtitle="A simple calculator for your EV charge" />

      <Container maxWidth="md" sx={{ marginTop: [-6, -10], position: "relative", marginBottom: 4 }}>
        <Box>
          <ChargeDetailsStep onSubmit={setFormData} />
        </Box>

        {!!formData && (
          <Box mt={4}>
            <ChargeResultsStep formData={formData} />
          </Box>
        )}
      </Container>
    </>
  );
}
