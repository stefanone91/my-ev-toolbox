"use client";

import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { Lexend_Deca } from "next/font/google";

const lexendDeca = Lexend_Deca({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const theme = responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily: lexendDeca.style.fontFamily,
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 700,
      },
      h3: {
        fontWeight: 700,
      },
      h4: {
        fontWeight: 700,
      },
      h5: {
        fontWeight: 700,
      },
      h6: {
        fontWeight: 700,
      },
    },
    shape: {
      borderRadius: 0,
    },
    palette: {
      mode: "light",
      primary: {
        main: "#41cb5a",
        contrastText: "white",
      },
    },
  })
);
