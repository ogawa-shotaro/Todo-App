import { Playfair_Display, Noto_Sans_JP } from "next/font/google";

const playfair = Playfair_Display({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

const noto = Noto_Sans_JP({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const fonts = {
  playfair,
  noto,
};

export default fonts;
