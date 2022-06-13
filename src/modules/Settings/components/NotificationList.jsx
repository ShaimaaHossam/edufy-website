import { Box, Checkbox, Typography } from "@mui/material";

function NotificationList({ values, onChange, title }) {
  return (
    <>
      <Typography textAlign="center" mb={2} component="h2" variant="h6">
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
    </>
  );
}

export default NotificationList;
