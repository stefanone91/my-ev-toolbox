import { Container, Box, Typography } from "@mui/material";
import Image from "next/image";
import backgroundImg from "./subbanner-background.jpg";

interface Props {
  title: string;
  subtitle: string;
}

export function Hero({ title, subtitle }: Props) {
  return (
    <Box component="section" position="relative" className="hero">
      <Box position="absolute" top={0} left={0} right={0} bottom={0} zIndex={0} sx={{ backgroundColor: "black" }}>
        <Image
          fill
          priority={true}
          src={backgroundImg}
          alt="Hero background of a man chargin EV vehicle"
          style={{ opacity: 0.6, objectFit: "cover" }}
        />
      </Box>

      <Container>
        <Box
          position="relative"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          py={[16, 16, 24]}
        >
          <Typography component="h1" variant="h1" color="white" fontWeight="strong" gutterBottom>
            {title}
          </Typography>

          <Typography component="p" color="white">
            {subtitle}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
