import { Sacramento } from "next/font/google";
import localFont from "next/font/local";

export const satoshi = localFont({
  src: [
    {
      path: "../../../public/assets/fonts/Satoshi-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../public/assets/fonts/Satoshi-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../../public/assets/fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/assets/fonts/Satoshi-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../../public/assets/fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/assets/fonts/Satoshi-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../../public/assets/fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../../public/assets/fonts/Satoshi-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../../public/assets/fonts/Satoshi-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../../public/assets/fonts/Satoshi-BlackItalic.woff2",
      weight: "900",
      style: "italic",
    },
  ],
  display: "swap",
  variable: "--font-satoshi",
});

export const sacramento = Sacramento({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-sacramento",
});
