import { useSelector, useDispatch } from "react-redux";
import { authSelector, setLanguage } from "../../redux/slices/auth";

import { useUpdateUserMutation } from "../../redux/services/people";

import { useTranslation } from "react-i18next";

import { MenuItem, ListItemIcon, ListItemText } from "@mui/material";

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
      updateUser({ id: user.id, language: newLang })
        .unwrap()
        .then((data) => dispatch(setLanguage({ language: data.language })));
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
      <MenuItem
        selected={language === LANGS.en}
        color={language === LANGS.en ? "primary" : "default"}
        onClick={() => handleLangChange(LANGS.en)}
      >
        <ListItemIcon>
          {language === LANGS.en && (
            <Icon
              icon={mdiCheck}
              color={language === LANGS.en ? "primary" : "default"}
            />
          )}
        </ListItemIcon>

        <ListItemText
          primaryTypographyProps={{
            color: language === LANGS.en ? "primary.main" : "text.primary",
          }}
        >
          {t("english")}
        </ListItemText>
      </MenuItem>

      <MenuItem
        selected={language === LANGS.ar}
        color={language === LANGS.ar ? "primary" : "default"}
        onClick={() => handleLangChange(LANGS.ar)}
      >
        <ListItemIcon>
          {language === LANGS.ar && (
            <Icon
              icon={mdiCheck}
              color={language === LANGS.ar ? "primary" : "default"}
            />
          )}
        </ListItemIcon>

        <ListItemText
          primaryTypographyProps={{
            color: language === LANGS.ar ? "primary.main" : "text.primary",
          }}
        >
          {t("arabic")}
        </ListItemText>
      </MenuItem>
    </Menu>
  );
}

export default NotificationMenu;
