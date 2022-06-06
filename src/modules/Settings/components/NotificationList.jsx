import { Box, Checkbox, Typography } from "@mui/material";

function NotificationList({ values, onChange, title }) {
  return (
    <Box flexDirection="row">
      <Typography textAlign="center" mb={2}>
        {title}
      </Typography>
      {values.map((option) => (
        <Box flexDirection="row" mb={3} key={option.key}>
          <Checkbox
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
        </Box>
      ))}
    </Box>
  );
}

export default NotificationList;
