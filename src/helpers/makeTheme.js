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
          disabledBackground: "none",
        },

        greyScale: {
          100: "#FCFCFC",
          200: "#FDFDFD",
          300: "#FBFBFB",
          400: "#F7F8FB",
        },

        divider: "#DBEAFD",
        border: "#D5D9E5",

        gradients: {
          primary: "linear-gradient(90deg, #3EE3EF 0%, #1E7AF0 100%)",
          primaryRadial: "linear-gradient(45deg, #3EE3EF 0%, #1E7AF0 100%)",
          secondary: "linear-gradient(90deg, #D9FAFC 0%, #D2E5FC 100%)",
          secondaryRadial: "linear-gradient(45deg, #D9FAFC 0%, #D2E5FC 100%)",
        },
      },
      shadows: ["none", "0px 2px 8px #ADB5D12B"],

      // MUI components overrides
      components: {
        MuiButton: {
          defaultProps: {
            size: "large",
            color: "primary",
            variant: "contained",
            disableElevation: true,
          },
          styleOverrides: {
            root: {
              textTransform: "none",
            },
            sizeLarge: {
              height: 40,
            },
            outlined: {
              "&:active": {
                borderColor: "transparent",
              },
              "&:disabled": {
                borderColor: "transparent",
                backgroundColor: "#FCFCFC",
              },
            },
            contained: {
              "&:disabled": {
                color: "#FFF",
                opacity: 0.3,
              },
            },
          },
        },
        MuiIconButton: {
          variants: [
            {
              props: { variant: "outlined" },
              style: {
                position: "relative",
                outline: "1px solid",
                outlineOffset: -1,
                "&::before": {
                  content: "''",
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  opacity: 0.1,
                  borderRadius: "50%",
                  backgroundColor: "currentColor",
                },
              },
            },
            {
              props: { variant: "contained" },
              style: {
                position: "relative",
                "&::before": {
                  content: "''",
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  opacity: 0.1,
                  borderRadius: "50%",
                  backgroundColor: "currentColor",
                },
              },
            },
          ],
        },
        MuiOutlinedInput: {
          styleOverrides: {
            input: {
              "&.Mui-disabled": {
                WebkitTextFillColor: "inherit",
              },
            },
          },
        },
      },
    },
    localesMap[lang]
  );
}

export default makeTheme;
