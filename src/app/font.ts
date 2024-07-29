import { Diphylleia, Montserrat_Alternates } from "next/font/google";

export const diphylleia = Diphylleia({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-diphylleia",
});

export const montserratAlternates = Montserrat_Alternates({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat-alternates",
  weight: "400",
});
