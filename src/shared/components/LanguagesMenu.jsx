import { useSelector, useDispatch } from "react-redux";
import { authSelector, setLanguage } from "../../redux/slices/auth";

import { useUpdateUserMutation } from "../../redux/services/people";

import { useTranslation } from "react-i18next";

import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

import { mdiTranslate, mdiCheck } from "@mdi/js";

import Menu from "./Menu";
import Icon from "./Icon";
import IconButton from "./IconButton";

import { LANGS } from "../../constants/global";

function NotificationMenu() {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { user, language } = useSelector(authSelector);

  const [updateUser] = useUpdateUserMutation();

  const handleLangChange = (newLang) => {
    if (newLang === language) return;

    if (!!user) {
      dispatch(
        updateUser({ id: user.id, language: newLang })
          .unwrap()
          .then((data) => dispatch(setLanguage({ language: data.language })))
      );
    } else {
      dispatch(setLanguage({ language: newLang }));
    }
  };

  return (
    <Menu
      label="languages menu"
      AnchorComponent={IconButton}
      AnchorComponentProps={{
        icon: mdiTranslate,
        size: "large",
        color: "primary",
        variant: "contained",
      }}
      AnchorComponentOpenProps={{
        variant: "outlined",
        sx: {
          backgroundImage:
            "linear-gradient(180deg, #3EE6EF33 0%, #1E7AF033 100%)",
        },
      }}
    >
      <ListItemButton
        selected={language === LANGS.en}
        color={language === LANGS.en ? "primary" : "default"}
        onClick={() => handleLangChange(LANGS.en)}
      >
        <ListItemIcon sx={{ minWidth: 20, mr: 1 }}>
          {language === LANGS.en && (
            <Icon
              icon={mdiCheck}
              size="small"
              color={language === LANGS.en ? "primary" : "default"}
            />
          )}
        </ListItemIcon>

        <ListItemText
          primaryTypographyProps={{
            color: language === LANGS.en ? "primary.main" : "text.secondary",
          }}
        >
          {t("english")}
        </ListItemText>
      </ListItemButton>

      <ListItemButton
        selected={language === LANGS.ar}
        color={language === LANGS.ar ? "primary" : "default"}
        onClick={() => handleLangChange(LANGS.ar)}
      >
        <ListItemIcon sx={{ minWidth: 20, mr: 1 }}>
          {language === LANGS.ar && (
            <Icon
              icon={mdiCheck}
              size="small"
              color={language === LANGS.ar ? "primary" : "default"}
            />
          )}
        </ListItemIcon>

        <ListItemText
          primaryTypographyProps={{
            color: language === LANGS.ar ? "primary.main" : "text.secondary",
          }}
        >
          {t("arabic")}
        </ListItemText>
      </ListItemButton>
    </Menu>
  );
}

export default NotificationMenu;
