
import { Box, Typography, Switch } from "@mui/material";

import { useTranslation } from "react-i18next";

function NotificationList({ title, values, onChange, category }) {
  const { t } = useTranslation("settings");
  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        {title}
      </Typography>

      <Box flexDirection="row" mb={3}>
        {values.map((option) => (
          <Box flexDirection="row" mb={3} key={option.key}>
            <Switch
              checked={option.value}
              onChange={(e) =>
                onChange(
                  values.map((opt) =>
                    opt.key === option.key
                      ? { ...opt, value: e.target.checked }
                      : opt
                  )
                )
              }
            />
            <Typography variant="p" ml={2}>
              {t(`${category}.${option.key}`)}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default NotificationList;
