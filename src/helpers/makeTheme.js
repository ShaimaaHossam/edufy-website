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
        h5: {
          fontWeight: 500,
        },
        subtitle1: {
          fontWeight: 500,
        },
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

        info: {
          main: "#03A9F4",
        },
        infoBg: "#DAEAFD",

        warning: {
          main: "#FFA303",
        },
        warningBg: "#FFF7D4",

        success: {
          main: "#29BF56",
          contrastText: "#FFF",
        },
        successBg: "#F0FBF3",

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
          500: "#F7F9FD",
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
      shadows: [
        "none",
        ...Array.from({ length: 23 }).fill("0px 2px 8px #ADB5D12B"),
        "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)",
      ],

      // MUI components overrides
      components: {
        MuiCssBaseline: {
          styleOverrides: `
            body {
              background-color: #FAFBFF;
            }
            #root {
              display: flex;
              flex-direction: column;
              min-height: 100vh;
            }
          `,
        },
        MuiPaper: {
          defaultProps: {
            elevation: 0,
          },
        },
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
        MuiOutlinedInput: {
          styleOverrides: {
            input: {
              "&.Mui-disabled": {
                WebkitTextFillColor: "inherit",
              },
            },
          },
        },
        MuiTabs: {
          styleOverrides: {
            root: {
              position: "relative",
              zIndex: 1,
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 1,
                backgroundColor: "#DBEAFD",
                zIndex: -1,
              },
            },
          },
        },
        MuiTab: {
          styleOverrides: {
            root: {
              minWidth: 100,
              textTransform: "none",
              "@media (max-width: 600px)": {
                minWidth: 80,
              },
            },
          },
        },
        MuiChip: {
          styleOverrides: {
            outlined: {
              position: "relative",
              "::before": {
                content: "''",
                width: "100%",
                height: "100%",
                backgroundColor: "currentColor",
                opacity: "0.07",
                position: "absolute",
                borderRadius: "inherit",
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
