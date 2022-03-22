import { createTheme } from "@mui/material/styles";
import { arEG, enUS } from "@mui/material/locale";

import { LANGS, LANGS_DIRS, LANGS_FONTS } from "../constants/global";

const localesMap = {
  [LANGS.ar]: arEG,
  [LANGS.en]: enUS,
};

function makeTheme({ lang }) {
  return createTheme(
    {
      direction: LANGS_DIRS[lang],
      typography: {
        fontFamily: `${LANGS_FONTS[lang]}, Helvetica, Arial, sans-serif`,
      },
      palette: {
        primary: {
          main: "#1E7AF0",
        },
        secondary: {
          main: "#FFA303",
        },

        text: {
          primary: "#20304F",
          secondary: "#607180",
        },

        success: {
          main: "#29BF56",
        },
        successBg: "#F0FBF3",

        warning: {
          main: "#FFA303",
        },
        warningBg: "#FFF7D4",

        error: {
          main: "#FC2424",
        },
        errorBg: "#FFEFEF",

        action: {
          disabled: "#D5D9E5",
        },

        greyScale: {
          100: "#FDFDFD",
          200: "#FBFBFB",
          300: "#F7F8FB",
        },

        divider: "#DBEAFD",

        gradients: {
          primary: "linear-gradient(90deg, #3EE3EF 0%, #1E7AF0 100%)",
          primaryRadial: "linear-gradient(45deg, #3EE3EF 0%, #1E7AF0 100%)",
          secondary: "linear-gradient(90deg, #D9FAFC 0%, #D2E5FC 100%)",
          secondaryRadial: "linear-gradient(45deg, #D9FAFC 0%, #D2E5FC 100%)",
        },
      },
      shadows: ["none", "0px 2px 8px #ADB5D12B"],
    },
    localesMap[lang]
  );
}

export default makeTheme;
