import * as React from "react";
import { Alert, Box } from "@mui/material";

export default function DescriptionAlerts({ message }: { message: string }) {
  return (
    <Box sx={{ width: "100%" }}>
      <Alert severity="error" sx={{ mb: 2 }}>
        {message}
      </Alert>
    </Box>
  );
}
